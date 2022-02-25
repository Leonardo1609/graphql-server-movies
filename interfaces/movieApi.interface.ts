export type MovieOrShow = 'MOVIE' | 'TV'

export interface IStandardApiResp<ItemType> {
  page: number
  results?: ItemType[]
  total_pages: number
  total_results: number
}

export interface INowPlayingMoviesResp extends IStandardApiResp<IMovie> {
  dates?: {
    maximum: Date
    minimum: Date
  }
}
export interface ISearchMoviesResp extends IStandardApiResp<IMovie> {}
export interface ISearchShowsResp extends IStandardApiResp<IShow> {}
export interface IShowsInAiringResp extends IStandardApiResp<IShow> {}
export interface ITopMoviesResp extends IStandardApiResp<IMovie> {}
export interface ITopShowsResp extends IStandardApiResp<IShow> {}

export interface IApiItem {
  adult?: boolean
  backdrop_path?: string
  genres?: Genre[]
  homepage?: string
  id?: number
  original_language?: string
  overview?: string
  popularity?: number
  poster_path?: string
  production_companies?: ProductionCompany[]
  production_countries?: ProductionCountry[]
  spoken_languages?: SpokenLanguage[]
  status?: string
  tagline?: string
  vote_average?: number
  vote_count?: number
}

export interface IMovie extends IApiItem {
  belongs_to_collection?: BelongsToCollection
  budget?: number
  imdb_id?: string
  original_title?: string
  release_date?: Date
  revenue?: number
  runtime?: number
  title?: string
  video?: boolean
}

export interface IShow extends IApiItem {
  created_by?: CreatedBy[]
  episode_run_time?: number[]
  first_air_date?: Date
  in_production?: boolean
  languages?: string[]
  last_air_date?: Date
  last_episode_to_air?: TEpisodeToAir
  name?: string
  networks?: ProductionCompany[]
  next_episode_to_air?: TEpisodeToAir
  number_of_episodes?: number
  number_of_seasons?: number
  origin_country?: string[]
  original_name?: string
  seasons?: Season[]
  type?: string
}

export interface BelongsToCollection {
  backdrop_path?: string
  id?: number
  name?: string
  poster_path?: string
}

export interface CreatedBy {
  credit_id?: string
  gender?: number
  id?: number
  name?: string
  profile_path?: string
}

export interface Genre {
  id?: number
  name?: string
}

export interface TEpisodeToAir {
  air_date?: Date
  episode_number?: number
  id?: number
  name?: string
  overview?: string
  production_code?: string
  season_number?: number
  still_path?: string
  vote_average?: number
  vote_count?: number
}

export interface ProductionCompany {
  id?: number
  logo_path?: null | string
  name?: string
  origin_country?: string
}

export interface ProductionCountry {
  iso_3166_1?: string
  name?: string
}

export interface Season {
  air_date?: Date
  episode_count?: number
  id?: number
  name?: string
  overview?: string
  poster_path?: string
  season_number?: number
}
export interface SpokenLanguage {
  english_name?: string
  iso_639_1?: string
  name?: string
}

export interface ICreditsResp {
  id?: number
  cast?: ICast[]
  crew?: ICast[]
}

export interface ICast {
  adult?: boolean
  gender?: number
  id?: number
  known_for_department?: string
  name?: string
  original_name?: string
  popularity?: number
  profile_path?: null | string
  cast_id?: number
  character?: string
  credit_id?: string
  order?: number
  department?: string
  job?: string
}
