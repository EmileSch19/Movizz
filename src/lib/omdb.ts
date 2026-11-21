import type { Film } from "../types/film"

// Clé lue côté serveur uniquement. OMDB_API_KEY est le nom recommandé ;
// l'ancien NEXT_PUBLIC_OMDB_API_KEY reste accepté le temps de la migration.
const API_KEY = process.env.OMDB_API_KEY ?? process.env.NEXT_PUBLIC_OMDB_API_KEY
const BASE_URL =
  process.env.OMDB_BASE_URL ?? process.env.NEXT_PUBLIC_OMDB_BASE_URL ?? "https://www.omdbapi.com"

const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR

// Appel générique à OMDB, mis en cache par Next.js pour économiser le quota
// (1 000 requêtes/jour sur la clé gratuite). Renvoie null en cas d'erreur réseau.
async function omdb(params: Record<string, string>, revalidate: number) {
  const url = new URL(BASE_URL)
  for (const [key, value] of Object.entries({ ...params, apikey: API_KEY ?? "" })) {
    url.searchParams.set(key, value) // encode automatiquement espaces, &, accents…
  }
  try {
    const res = await fetch(url, { next: { revalidate } })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

// Recherche des films par mot-clé
export async function searchFilms(query: string): Promise<Film[]> {
  const data = await omdb({ s: query, type: "movie" }, ONE_HOUR)

  // OMDB retourne Response: "False" si aucun résultat
  if (!data || data.Response === "False") return []
  return data.Search as Film[]
}

// Récupère les détails complets d'un film via son ID IMDB (null si introuvable)
export async function getFilmById(id: string): Promise<Film | null> {
  const data = await omdb({ i: id, plot: "full" }, ONE_DAY)
  if (!data || data.Response === "False") return null
  return data as Film
}

// Page d'accueil : quelques sagas populaires, résultats mis en cache 24 h.
// (Avant : 34 requêtes à chaque visite → quota épuisé en ~30 visites.)
const POPULAR_QUERIES = ["star wars", "batman", "harry potter", "avengers", "dune", "interstellar"]

export async function getPopularFilms(limit = 12): Promise<Film[]> {
  const results = await Promise.all(
    POPULAR_QUERIES.map((q) => omdb({ s: q, type: "movie" }, ONE_DAY)),
  )

  // Fusionne en prenant les films à tour de rôle dans chaque saga, sans doublon
  const lists: Film[][] = results.map((d) => (d && d.Response !== "False" ? d.Search : []))
  const seen = new Set<string>()
  const films: Film[] = []
  for (let i = 0; films.length < limit && lists.some((l) => i < l.length); i++) {
    for (const list of lists) {
      const film = list[i]
      if (film && !seen.has(film.imdbID) && films.length < limit) {
        seen.add(film.imdbID)
        films.push(film)
      }
    }
  }
  return films
}
