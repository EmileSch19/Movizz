"use client"

import { Film } from "../types/film"
import { useFavoris } from "../lib/useFavoris"

export default function FavoriButton({ film }: { film: Film }) {
  const { isFavori, add, remove } = useFavoris()
  const favori = isFavori(film.imdbID)

  return (
    <button
      type="button"
      onClick={() => (favori ? remove(film.imdbID) : add(film))}
      aria-pressed={favori}
      className={`inline-flex h-12 items-center gap-2 self-start rounded-xl px-6 text-[15px] font-bold transition ${
        favori ? "border border-ink bg-white text-ink hover:bg-ink-soft" : "bg-ink text-white hover:bg-ink/85"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={favori ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
      </svg>
      {favori ? "Dans tes favoris" : "Ajouter aux favoris"}
    </button>
  )
}
