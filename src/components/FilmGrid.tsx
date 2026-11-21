import { Film } from "../types/film"
import FilmCard from "./FilmCard"

export default function FilmGrid({ films }: { films: Film[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {films.map((film) => (
        <FilmCard key={film.imdbID} film={film} />
      ))}
    </div>
  )
}

// Squelette affiché pendant le chargement
export function FilmGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="aspect-[2/3] animate-pulse rounded-2xl bg-ink-soft" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-ink-soft" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-ink-soft" />
        </div>
      ))}
    </div>
  )
}
