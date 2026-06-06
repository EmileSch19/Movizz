"use client"

import { useEffect, useState } from "react"
import { Film } from "../types/films"

export default function FavoriButton({ film }: { film: Film }) {
  const [isFavori, setIsFavori] = useState(false)

  // Vérifie si le film est déjà en favori
  useEffect(() => {
    const stored = localStorage.getItem("favoris")
    if (!stored) return
    const favoris: Film[] = JSON.parse(stored)
    setIsFavori(favoris.some((f) => f.imdbID === film.imdbID))
  }, [film.imdbID])

  function toggleFavori() {
    const stored = localStorage.getItem("favoris")
    const favoris: Film[] = stored ? JSON.parse(stored) : []

    if (isFavori) {
      // Retire des favoris
      const updated = favoris.filter((f) => f.imdbID !== film.imdbID)
      localStorage.setItem("favoris", JSON.stringify(updated))
      setIsFavori(false)
    } else {
      // Ajoute aux favoris
      localStorage.setItem("favoris", JSON.stringify([...favoris, film]))
      setIsFavori(true)
    }
  }

  return (
    <button
      onClick={toggleFavori}
      className={`mt-2 rounded-xl px-5 py-2 text-sm font-medium transition ${
        isFavori
          ? "bg-red-100 text-red-500 hover:bg-red-200"
          : "bg-purple-500 text-white hover:bg-purple-600"
      }`}
    >
      {isFavori ? "✕ Retirer des favoris" : "♡ Ajouter aux favoris"}
    </button>
  )
}