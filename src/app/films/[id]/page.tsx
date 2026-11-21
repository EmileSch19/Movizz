import { getFilmById } from "@/lib/omdb"
import FavoriButton from "@/components/FavoriButton"
import BackButton from "@/components/BackButton"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

// Titre et description de l'onglet / des aperçus de lien
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const film = await getFilmById(id)
  if (!film) return { title: "Film introuvable — Movizz" }
  return {
    title: `${film.Title} (${film.Year}) — Movizz`,
    description: film.Plot !== "N/A" ? film.Plot : undefined,
    openGraph: film.Poster !== "N/A" ? { images: [film.Poster] } : undefined,
  }
}

const show = (v?: string) => v && v !== "N/A"

export default async function FilmDetailPage({ params }: Props) {
  // En Next.js 15+, params est une Promise
  const { id } = await params
  const film = await getFilmById(id)

  // ID inconnu → page 404 au lieu d'un plantage
  if (!film) notFound()

  return (
    <div className="pt-6">
      <BackButton />

      <div className="mt-6 flex flex-col gap-10 md:flex-row">
        {/* Affiche */}
        <div className="relative aspect-[2/3] w-2/3 max-w-xs shrink-0 self-center overflow-hidden rounded-2xl bg-ink-soft shadow-[0_16px_40px_rgba(24,24,27,0.14)] md:w-80 md:max-w-none md:self-start">
          {show(film.Poster) ? (
            <Image src={film.Poster} alt={`Affiche de ${film.Title}`} fill sizes="(min-width: 768px) 320px, 100vw" className="object-cover" priority />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">Aucune affiche</div>
          )}
        </div>

        {/* Infos */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">{film.Title}</h1>
            <p className="text-[15px] text-muted">
              {[film.Year, show(film.Runtime) && film.Runtime].filter(Boolean).join(" · ")}
            </p>
            {show(film.Genre) && (
              <ul className="flex flex-wrap gap-2" aria-label="Genres">
                {film.Genre.split(", ").map((g) => (
                  <li key={g} className="rounded-full border border-line bg-white px-3 py-1 text-[13px] font-semibold">{g}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Note */}
          {show(film.imdbRating) && (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold">★ {film.imdbRating}</span>
              <span className="text-sm text-muted">/ 10 sur IMDb</span>
            </div>
          )}

          <FavoriButton film={film} />

          {/* Synopsis, réalisation, casting */}
          <dl className="flex flex-col divide-y divide-line border-y border-line">
            {[
              ["Synopsis", film.Plot],
              ["Réalisation", film.Director],
              ["Casting", film.Actors],
            ]
              .filter(([, v]) => show(v))
              .map(([label, value]) => (
                <div key={label} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <dt className="text-sm font-bold">{label}</dt>
                  <dd className="text-[15px] leading-relaxed text-muted">{value}</dd>
                </div>
              ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
