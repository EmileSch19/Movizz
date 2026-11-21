import Image from "next/image"
import Link from "next/link"
import { Film } from "../types/film"
import FavoriIcon from "./FavoriIcon"

interface FilmCardProps {
  film: Film
}

export default function FilmCard({ film }: FilmCardProps) {
  return (
    <div className="group relative flex flex-col gap-3">
      <Link href={`/films/${film.imdbID}`} className="flex flex-col gap-3">
        {/* Affiche du film */}
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-ink-soft shadow-[0_10px_30px_rgba(24,24,27,0.10)]">
          {film.Poster && film.Poster !== "N/A" ? (
            <Image
              src={film.Poster}
              alt={`Affiche de ${film.Title}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            // Placeholder si pas d'affiche disponible
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted">
              Aucune affiche
            </div>
          )}
        </div>

        {/* Infos du film */}
        <div className="flex flex-col gap-0.5">
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug">{film.Title}</h3>
          <span className="text-[13px] text-muted">
            {film.Year}
            {film.imdbRating && film.imdbRating !== "N/A" && ` · ★ ${film.imdbRating}`}
          </span>
        </div>
      </Link>

      {/* Favori, en dehors du lien pour rester un vrai bouton */}
      <FavoriIcon film={film} />
    </div>
  )
}
