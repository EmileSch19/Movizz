import { FilmGridSkeleton } from "@/components/FilmGrid"

// Affiché instantanément pendant le chargement des films
export default function Loading() {
  return (
    <div className="pt-24" role="status" aria-label="Chargement des films">
      <FilmGridSkeleton />
    </div>
  )
}
