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
      className={`mt-2 rounded-xl px-5 py-2 text-sm font-medium transition ${
        favori
          ? "bg-red-100 text-red-500 hover:bg-red-200"
          : "bg-purple-500 text-white hover:bg-purple-600"
      }`}
    >
      {favori ? "✕ Retirer des favoris" : "♡ Ajouter aux favoris"}
    </button>
  )
}
