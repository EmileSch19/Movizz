"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
  /** Recherche en cours, pour pré-remplir le champ */
  defaultValue?: string
  /** Grande barre centrée (accueil) ou compacte (pages de résultats) */
  size?: "lg" | "md"
}

export default function SearchBar({ defaultValue = "", size = "lg" }: Props) {
  // Valeur saisie dans l'input
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  // Redirige vers la page films avec le mot-clé en paramètre URL
  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/films?q=${encodeURIComponent(query.trim())}`)
  }

  const lg = size === "lg"

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className={`flex w-full gap-1.5 rounded-2xl border border-line bg-white p-1.5 ${
        lg ? "max-w-2xl shadow-[0_8px_24px_rgba(24,24,27,0.06)]" : "max-w-xl"
      }`}
    >
      <label htmlFor="recherche" className="sr-only">Rechercher un film</label>
      <input
        id="recherche"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Titre, saga…"
        className={`min-w-0 flex-1 bg-transparent px-4 outline-none placeholder:text-muted/70 ${lg ? "h-12 text-base" : "h-11 text-sm"}`}
      />
      <button
        type="submit"
        className={`rounded-xl bg-ink px-6 font-bold text-white transition hover:bg-ink/85 ${lg ? "h-12 text-[15px]" : "h-11 text-sm"}`}
      >
        Rechercher
      </button>
    </form>
  )
}
