"use client"

import { useCallback, useSyncExternalStore } from "react"
import { Film } from "../types/film"

// Favoris stockés dans le localStorage, partagés entre tous les composants
// (bouton favori, page favoris…) et synchronisés entre onglets.

const KEY = "favoris"
const EMPTY: Film[] = []
const listeners = new Set<() => void>()

let cachedRaw: string | null = null
let cachedList: Film[] = EMPTY

function read(): Film[] {
  const raw = localStorage.getItem(KEY)
  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      cachedList = raw ? (JSON.parse(raw) as Film[]) : EMPTY
    } catch {
      cachedList = EMPTY
    }
  }
  return cachedList
}

function write(list: Film[]) {
  localStorage.setItem(KEY, JSON.stringify(list))
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => e.key === KEY && listener()
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

export function useFavoris() {
  const favoris = useSyncExternalStore(subscribe, read, () => EMPTY)

  const isFavori = useCallback(
    (imdbID: string) => favoris.some((f) => f.imdbID === imdbID),
    [favoris],
  )

  const add = useCallback((film: Film) => {
    const list = read()
    if (!list.some((f) => f.imdbID === film.imdbID)) write([...list, film])
  }, [])

  const remove = useCallback((imdbID: string) => {
    write(read().filter((f) => f.imdbID !== imdbID))
  }, [])

  return { favoris, isFavori, add, remove }
}
