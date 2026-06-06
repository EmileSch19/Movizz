import { getFilmById } from "@/lib/omdb"
import FavoriButton from "@/components/FavoriButton"
import Image from "next/image"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function FilmDetailPage({ params }: Props) {
  // En Next.js 15+, params est une Promise
  const { id } = await params
  const film = await getFilmById(id)

  return (
    <div>

      {/* Bouton retour */}
      <Link
        href="/films"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-400 transition hover:text-gray-900"
      >
        ← Retour
      </Link>

      {/* Contenu principal */}
      <div className="mt-4 flex flex-col gap-8 md:flex-row">

        {/* Affiche */}
        <div className="relative h-96 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 md:w-64">
          {film.Poster !== "N/A" ? (
            <Image
              src={film.Poster}
              alt={film.Title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Aucune affiche
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="flex flex-col gap-4">

          {/* Titre + année */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{film.Title}</h1>
            <p className="mt-1 text-sm text-gray-400">
              {film.Year} · {film.Runtime} · {film.Genre}
            </p>
          </div>

          {/* Note */}
          {film.imdbRating !== "N/A" && (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-amber-500">
                ★ {film.imdbRating}
              </span>
              <span className="text-sm text-gray-400">/ 10 sur IMDB</span>
            </div>
          )}

          {/* Synopsis */}
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-900">Synopsis</h2>
            <p className="text-sm leading-relaxed text-gray-500">{film.Plot}</p>
          </div>

          {/* Réalisateur */}
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-900">Réalisateur</h2>
            <p className="text-sm text-gray-500">{film.Director}</p>
          </div>

          {/* Casting */}
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-900">Casting</h2>
            <p className="text-sm text-gray-500">{film.Actors}</p>
          </div>

          {/* Bouton favori */}
          <FavoriButton film={film} />

        </div>
      </div>

    </div>
  )
}