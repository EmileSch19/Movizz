import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-purple-500">
          Movizz
        </Link>

        {/* Liens de navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/films"
            className="text-sm text-gray-500 transition hover:text-gray-900"
          >
            Films
          </Link>
          <Link
            href="/favoris"
            className="text-sm text-gray-500 transition hover:text-gray-900"
          >
            Favoris
          </Link>
        </div>

      </div>
    </nav>
  )
}