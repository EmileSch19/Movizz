"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBar() {
  // Valeur saisie dans l'input
  const [query, setQuery] = useState("")
  const router = useRouter()

  // Redirige vers la page films avec le mot-clé en paramètre URL
  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/films?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-xl gap-2">

      {/* Champ de recherche */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un film..."
        className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
      />

      {/* Bouton de recherche */}
      <button
        type="submit"
        className="rounded-xl bg-purple-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-600"
      >
        Rechercher
      </button>

    </form>
  )
}