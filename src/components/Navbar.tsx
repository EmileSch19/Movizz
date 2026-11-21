"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useFavoris } from "@/lib/useFavoris"

export default function Navbar() {
  const pathname = usePathname()
  const { favoris } = useFavoris()

  const links = [
    { href: "/films", label: "Films", active: pathname === "/" || pathname.startsWith("/films") },
    { href: "/favoris", label: `Favoris${favoris.length ? ` · ${favoris.length}` : ""}`, active: pathname === "/favoris" },
  ]

  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-6 py-5">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M7 4v16l13-8Z" /></svg>
        </span>
        Movizz
      </Link>

      <div className="flex-1" />

      {/* Liens de navigation */}
      <nav aria-label="Navigation principale" className="flex gap-1.5 text-sm font-semibold">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={l.active ? "page" : undefined}
            className={`rounded-full px-4 py-2.5 transition ${
              l.active ? "bg-ink-soft text-ink" : "text-muted hover:bg-ink-soft/60"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
