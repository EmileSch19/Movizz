import Image from "next/image"
import Link from "next/link"
import { Film } from "../types/film"

interface FilmCardProps {
  film: Film
}

export default function FilmCard({ film }: FilmCardProps) {
  return (
    <Link href={`/films/${film.imdbID}`}>
      <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white transition hover:shadow-md">

        {/* Affiche du film */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-xl bg-gray-100">
          {film.Poster !== "N/A" ? (
            <Image
              src={film.Poster}
              alt={film.Title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          ) : (
            // Placeholder si pas d'affiche disponible
            <div className="flex h-full items-center justify-center text-gray-400">
              Aucune affiche
            </div>
          )}
        </div>

        {/* Infos du film */}
        <div className="p-3">
          {/* Titre */}
          <h3 className="truncate text-sm font-medium text-gray-900">
            {film.Title}
          </h3>

          {/* Année + note */}
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-gray-400">{film.Year}</span>
            {film.imdbRating && film.imdbRating !== "N/A" && (
              <span className="text-xs font-medium text-amber-500">
                ★ {film.imdbRating}
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  )
}
