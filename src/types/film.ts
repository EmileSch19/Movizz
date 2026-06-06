// Représente un film complet retourné par l'API OMDB
export interface Film {
  imdbID: string      // Identifiant unique IMDB (ex: tt0816692)
  Title: string       // Titre du film
  Year: string        // Année de sortie
  Genre: string       // Genres séparés par des virgules
  Plot: string        // Synopsis
  Poster: string      // URL de l'affiche
  imdbRating: string  // Note sur 10
  Director: string    // Réalisateur
  Actors: string      // Acteurs principaux
  Runtime: string     // Durée (ex: "169 min")
  Type: string        // Type : "movie", "series", etc.
}

// Représente la réponse de l'API lors d'une recherche
export interface SearchResult {
  Search: Film[]        // Liste des films trouvés
  totalResults: string  // Nombre total de résultats
  Response: string      // "True" ou "False" selon le succès
}