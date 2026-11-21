import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mt-24 flex flex-col items-center gap-4 text-center">
      <h1 className="text-2xl font-extrabold">Film introuvable</h1>
      <p className="text-muted">Ce film n&apos;existe pas ou n&apos;est plus disponible.</p>
      <Link href="/films" className="flex h-11 items-center rounded-xl bg-ink px-6 text-sm font-bold text-white transition hover:bg-ink/85">
        Voir tous les films
      </Link>
    </div>
  )
}
