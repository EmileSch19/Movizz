"use client"

import FilmCard from "@/components/FilmCard"
import { useFavoris } from "@/lib/useFavoris"

export default function FavorisPage() {
  // Favoris lus depuis le localStorage via le hook partagé
  const { favoris, remove } = useFavoris()

  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mes favoris</h1>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-500">
          {favoris.length} film{favoris.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Liste vide */}
      {favoris.length === 0 ? (
        <div className="mt-20 text-center text-gray-400">
          Aucun favori pour l&apos;instant.<br />
          Recherche un film et ajoute-le à tes favoris ✨
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {favoris.map((film) => (
            <div key={film.imdbID} className="relative">
              <FilmCard film={film} />

              {/* Bouton supprimer */}
              <button
                type="button"
                onClick={() => remove(film.imdbID)}
                aria-label={`Retirer ${film.Title} des favoris`}
                className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-xs text-red-400 shadow transition hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}