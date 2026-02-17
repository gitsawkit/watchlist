export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids?: number[]
}

export interface Genre {
  id: number
  name: string
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number
  status: string
  tagline: string
  budget: number
  revenue: number
  homepage: string
  certification?: string
}

export interface Cast {
  id: number
  name: string
  original_name: string
  character: string
  profile_path: string | null
  order: number
}

export interface Crew {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface Credits {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface Video {
  id: string
  key: string
  name: string
  site: string // "YouTube", etc.
  type: string // "Trailer", "Teaser", etc.
}

export interface VideoResponse {
  id: number
  results: Video[]
}

export interface ReleaseDate {
  certification: string
  release_date: string
  type: number
}

export interface ReleaseDatesResponse {
  id: number
  results: Array<{
    iso_3166_1: string
    release_dates: ReleaseDate[]
  }>
}

export interface MovieImage {
  aspect_ratio: number
  height: number
  iso_639_1: string | null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface MovieImagesResponse {
  id: number
  backdrops: MovieImage[]
  logos: MovieImage[]
  posters: MovieImage[]
}

// ─── Actor ───────────────────────────────────────────────

export interface ActorDetails {
  id: number
  name: string
  biography: string
  birthday: string | null
  deathday: string | null
  place_of_birth: string | null
  profile_path: string | null
  known_for_department: string
  popularity: number
  also_known_as: string[]
  gender: number
}

export interface ActorMovieCredit {
  id: number
  title: string
  character: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  popularity: number
  overview: string
}

export interface ActorTvCredit {
  id: number
  name: string
  character: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  popularity: number
  overview: string
}
