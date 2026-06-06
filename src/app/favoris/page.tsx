"use client"

import { useEffect, useState } from "react"
import { Film } from "@/types/film"
import FilmCard from "@/components/FilmCard"

export default function FavorisPage() {
  const [favoris, setFavoris] = useState<Film[]>([])

  // Charge les favoris depuis le localStorage au montage du composant
  useEffect(() => {
    const stored = localStorage.getItem("favoris")
    if (stored) setFavoris(JSON.parse(stored))
  }, [])

  // Supprime un film des favoris
  function removeFavori(imdbID: string) {
    const updated = favoris.filter((f) => f.imdbID !== imdbID)
    setFavoris(updated)
    localStorage.setItem("favoris", JSON.stringify(updated))
  }

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
          Aucun favori pour l instant.<br />
          Recherche un film et ajoute-le à tes favoris ✨
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {favoris.map((film) => (
            <div key={film.imdbID} className="relative">
              <FilmCard film={film} />

              {/* Bouton supprimer */}
              <button
                onClick={() => removeFavori(film.imdbID)}
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