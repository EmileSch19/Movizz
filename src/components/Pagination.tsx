import Link from "next/link"

interface Props {
  query: string
  page: number
  totalPages: number
}

// Pagination des résultats de recherche (liens = navigation sans JS, partageables)
export default function Pagination({ query, page, totalPages }: Props) {
  if (totalPages <= 1) return null

  const href = (p: number) => `/films?q=${encodeURIComponent(query)}&page=${p}`
  // Fenêtre de 5 pages autour de la page courante
  const start = Math.max(1, Math.min(page - 2, totalPages - 4))
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i)
  const base = "flex h-11 min-w-11 items-center justify-center rounded-xl px-3 text-sm font-semibold transition"

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} className={`${base} border border-line hover:bg-ink-soft`}>← Précédent</Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${base} ${p === page ? "bg-ink text-white" : "border border-line hover:bg-ink-soft"}`}
        >
          {p}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={href(page + 1)} className={`${base} border border-line hover:bg-ink-soft`}>Suivant →</Link>
      )}
    </nav>
  )
}
