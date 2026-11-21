"use client"

import { Film } from "../types/film"
import { useFavoris } from "../lib/useFavoris"

// Bouton cœur posé sur une affiche
export default function FavoriIcon({ film }: { film: Film }) {
  const { isFavori, add, remove } = useFavoris()
  const on = isFavori(film.imdbID)

  return (
    <button
      type="button"
      onClick={() => (on ? remove(film.imdbID) : add(film))}
      aria-pressed={on}
      aria-label={on ? `Retirer ${film.Title} des favoris` : `Ajouter ${film.Title} aux favoris`}
      className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm transition hover:scale-105"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
      </svg>
    </button>
  )
}
