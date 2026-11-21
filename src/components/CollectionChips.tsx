import Link from "next/link"
import { COLLECTIONS, CollectionKey } from "@/lib/omdb"

// Sélections thématiques de l'accueil (liens : ?collection=…)
export default function CollectionChips({ active }: { active: CollectionKey }) {
  return (
    <nav aria-label="Collections" className="flex flex-wrap justify-center gap-2">
      {(Object.keys(COLLECTIONS) as CollectionKey[]).map((key) => {
        const on = key === active
        return (
          <Link
            key={key}
            href={key === "populaires" ? "/" : `/?collection=${key}`}
            scroll={false}
            aria-current={on ? "true" : undefined}
            className={`flex h-10 items-center rounded-full border px-4 text-[13px] font-semibold transition ${
              on ? "border-ink bg-ink text-white" : "border-line bg-white text-ink/80 hover:border-ink/40"
            }`}
          >
            {COLLECTIONS[key].label}
          </Link>
        )
      })}
    </nav>
  )
}
