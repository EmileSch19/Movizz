import { searchFilmsPage, getPopularFilms, RESULTS_PER_PAGE } from "@/lib/omdb"
import FilmGrid from "@/components/FilmGrid"
import SearchBar from "@/components/SearchBar"
import Pagination from "@/components/Pagination"

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function FilmsPage({ searchParams }: Props) {
  const { q, page: rawPage } = await searchParams
  const query = q?.trim() ?? ""
  // OMDB limite la pagination à 100 pages
  const page = Math.min(100, Math.max(1, Number(rawPage) || 1))

  // Si un mot-clé est présent → recherche paginée, sinon → films populaires
  const { films, total } = query
    ? await searchFilmsPage(query, page)
    : { films: await getPopularFilms(12), total: 0 }
  const totalPages = Math.min(100, Math.ceil(total / RESULTS_PER_PAGE))

  return (
    <div className="pt-8">
      {/* Header + barre de recherche */}
      <section className="mb-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight">
            {query ? `Résultats pour « ${query} »` : "Tous les films"}
          </h1>
          {query && total > 0 && (
            <span className="text-sm text-muted">
              {total} film{total > 1 ? "s" : ""}{totalPages > 1 ? ` · page ${page} sur ${totalPages}` : ""}
            </span>
          )}
        </div>
        <SearchBar key={query} defaultValue={query} size="md" />
      </section>

      {/* Résultats */}
      {films.length === 0 ? (
        <div className="mt-20 text-center text-muted">
          {query ? `Aucun film trouvé pour « ${query} ».` : "Impossible de charger les films pour le moment."}
        </div>
      ) : (
        <>
          <FilmGrid films={films} />
          <Pagination query={query} page={page} totalPages={totalPages} />
        </>
      )}
    </div>
  )
}
