import { getPopularFilms } from "@/lib/omdb"
import FilmCard from "@/components/FilmCard"
import SearchBar from "@/components/SearchBar"

export default async function HomePage() {
  // Récupère les films populaires au chargement de la page
  const films = await getPopularFilms()

  return (
    <div>

      {/* Hero — titre + barre de recherche */}
      <section className="mb-12 flex flex-col items-center gap-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Trouve ton prochain film 🎬
        </h1>
        <p className="text-gray-400">
          Recherche, découvre et sauvegarde tes films préférés
        </p>
        <SearchBar />
      </section>

      {/* Grille films populaires */}
      <section>
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Films populaires
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {films.map((film) => (
            <FilmCard key={film.imdbID} film={film} />
          ))}
        </div>
      </section>

    </div>
  )
}