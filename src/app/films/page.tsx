import { searchFilms, getPopularFilms } from "@/lib/omdb"
import FilmCard from "@/components/FilmCard"
import SearchBar from "@/components/SearchBar"

interface Props {
  searchParams: { q?: string }
}

export default async function FilmsPage({ searchParams }: Props) {
  const query = searchParams.q

  // Si un mot-clé est présent → recherche, sinon → films populaires
  const films = query
    ? await searchFilms(query)
    : await getPopularFilms()

  return (
    <div>

      {/* Header + barre de recherche */}
      <section className="mb-8 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {query ? `Résultats pour "${query}"` : "Tous les films"}
        </h1>
        <SearchBar />
      </section>

      {/* Résultats */}
      {films.length === 0 ? (
        // Aucun résultat trouvé
        <div className="mt-20 text-center text-gray-400">
          Aucun film trouvé pour "{query}"
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {films.map((film) => (
            <FilmCard key={film.imdbID} film={film} />
          ))}
        </div>
      )}

    </div>
  )
}