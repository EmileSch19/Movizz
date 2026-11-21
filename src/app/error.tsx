"use client" // Les error boundaries sont des Client Components

import { useEffect } from "react"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mt-24 flex flex-col items-center gap-4 text-center">
      <h1 className="text-2xl font-extrabold">Oups, quelque chose s&apos;est mal passé.</h1>
      <p className="text-muted">Le service de films ne répond pas. Réessaie dans un instant.</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="h-11 rounded-xl bg-ink px-6 text-sm font-bold text-white transition hover:bg-ink/85"
      >
        Réessayer
      </button>
    </div>
  )
}
