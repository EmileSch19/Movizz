import { getPopularFilms, COLLECTIONS, isCollection } from "@/lib/omdb"
import FilmGrid from "@/components/FilmGrid"
import SearchBar from "@/components/SearchBar"
import CollectionChips from "@/components/CollectionChips"

interface Props {
  searchParams: Promise<{ collection?: string }>
}

export default async function HomePage({ searchParams }: Props) {
  const { collection: raw } = await searchParams
  const collection = isCollection(raw) ? raw : "populaires"

  // Films de la collection choisie (mis en cache 24 h)
  const films = await getPopularFilms(12, collection)

  return (
    <div>
      {/* Hero — titre + barre de recherche */}
      <section className="flex flex-col items-center gap-5 pb-10 pt-16 text-center sm:pt-20">
        <h1 className="text-4xl font-extrabold tracking-[-0.035em] sm:text-6xl">
          Trouve ton prochain film.
        </h1>
        <p className="text-lg text-muted">
          Recherche, découvre et garde tes films préférés sous la main.
        </p>
        <div className="mt-3 flex w-full justify-center">
          <SearchBar />
        </div>
        <CollectionChips active={collection} />
      </section>

      {/* Grille de la collection */}
      <section className="flex flex-col gap-6 pt-6">
        <h2 className="text-xl font-bold">{collection === "populaires" ? "Films populaires" : COLLECTIONS[collection].label}</h2>
        {films.length ? (
          <FilmGrid films={films} />
        ) : (
          <p className="py-16 text-center text-muted">Impossible de charger les films pour le moment.</p>
        )}
      </section>
    </div>
  )
}
