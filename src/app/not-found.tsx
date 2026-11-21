import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mt-20 flex flex-col items-center gap-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Film introuvable</h1>
      <p className="text-gray-400">Ce film n&apos;existe pas ou n&apos;est plus disponible.</p>
      <Link href="/films" className="rounded-xl bg-purple-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-600">
        Voir tous les films
      </Link>
    </div>
  )
}
