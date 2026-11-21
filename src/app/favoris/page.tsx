"use client"

import Link from "next/link"
import FilmGrid from "@/components/FilmGrid"
import { useFavoris } from "@/lib/useFavoris"

export default function FavorisPage() {
  // Favoris lus depuis le localStorage via le hook partagé
  const { favoris } = useFavoris()

  return (
    <div className="pt-8">
      {/* Header */}
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-3xl font-extrabold tracking-tight">Mes favoris</h1>
        <span className="text-sm text-muted">
          {favoris.length} film{favoris.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Liste vide */}
      {favoris.length === 0 ? (
        <div className="mt-20 flex flex-col items-center gap-4 text-center">
          <p className="text-muted">
            Aucun favori pour l&apos;instant.<br />
            Touche le cœur d&apos;une affiche pour l&apos;ajouter ici.
          </p>
          <Link href="/" className="flex h-11 items-center rounded-xl bg-ink px-6 text-sm font-bold text-white transition hover:bg-ink/85">
            Découvrir des films
          </Link>
        </div>
      ) : (
        <FilmGrid films={favoris} />
      )}
    </div>
  )
}
