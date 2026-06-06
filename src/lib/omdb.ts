import { Film } from "../types/film"

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL

// Recherche des films par mot-clé
export async function searchFilms(query: string): Promise<Film[]> {
  const res = await fetch(`${BASE_URL}/?s=${query}&type=movie&apikey=${API_KEY}`)
  const data = await res.json()

  // OMDB retourne Response: "False" si aucun résultat
  if (data.Response === "False") return []
  return data.Search
}

// Récupère les détails complets d'un film via son ID IMDB
export async function getFilmById(id: string): Promise<Film> {
  const res = await fetch(`${BASE_URL}/?i=${id}&plot=full&apikey=${API_KEY}`)
  return res.json()
}

// Simule une page d'accueil en cherchant plusieurs catégories populaires
export async function getPopularFilms(): Promise<Film[]> {
    const queries = [
    "marvel", "batman", "superman", "spider-man",
    "harry potter", "star wars", "hobbit", "lord rings",
    "james bond", "fast furious", "mission impossible",
    "jurassic", "pirates caribbean", "transformers",
    "avengers", "iron man", "thor", "captain america",
    "matrix", "inception", "interstellar", "titanic",
    "avatar", "gladiator", "joker", "oppenheimer",
    "dune", "alien", "predator", "terminator",
    "john wick", "die hard", "rocky", "rambo"
  ]

  // Lance toutes les recherches en parallèle pour aller plus vite
  const results = await Promise.all(queries.map(q => searchFilms(q)))

  // Fusionne tous les résultats et limite à 12 films
  return results.flat().slice(0, 12)
}