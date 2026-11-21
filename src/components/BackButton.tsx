"use client"

import { useRouter } from "next/navigation"

// Revient à la page précédente (recherche, favoris…), sinon à la liste des films
export default function BackButton() {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => (window.history.length > 1 ? router.back() : router.push("/films"))}
      className="inline-flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-muted transition hover:bg-ink-soft hover:text-ink"
    >
      ← Retour
    </button>
  )
}
