import { gql } from 'apollo-server'

export const schemaMovieApi = gql`
  type VideosResponse {
    id: Int
    results: [Video!]
  }

  type Video {
    iso_639_1: String
    iso_3166_1: String
    name: String
    key: String
    published_at: String
    site: String
    size: Int
    type: String
    official: Boolean
    id: String
  }

  type CreditsResponse {
    id: Int
    crew: [ItemCast!]
    cast: [ItemCast!]
  }

  type ItemCast {
    adult: Boolean
    gender: Int
    id: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Int
    profile_path: String
    cast_id: Int
    character: String
    credit_id: String
    order: Int
    department: String
    job: String
  }

  interface Item {
    adult: Boolean
    backdrop_path: String
    genres: [Genre!]
    homepage: String
    id: Int
    original_language: String
    overview: String
    popularity: Float
    poster_path: String
    production_companies: [ProductionCompany!]
    production_countries: [ProductionCountry!]
    spoken_languages: [SpokenLanguage!]
    status: String
    tagline: String
    vote_average: Float
    vote_count: Int
  }

  type Movie implements Item {
    adult: Boolean
    backdrop_path: String
    belongs_to_collection: BelongsToCollection
    budget: Float
    genres: [Genre!]
    homepage: String
    id: Int
    imdb_id: String
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    production_companies: [ProductionCompany!]
    production_countries: [ProductionCountry!]
    release_date: String
    revenue: Int
    runtime: Int
    spoken_languages: [SpokenLanguage!]
    status: String
    tagline: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
  }

  type Show implements Item {
    adult: Boolean
    backdrop_path: String
    genres: [Genre!]
    homepage: String
    id: Int
    original_language: String
    overview: String
    popularity: Float
    poster_path: String
    production_companies: [ProductionCompany!]
    production_countries: [ProductionCountry!]
    spoken_languages: [SpokenLanguage!]
    status: String
    tagline: String
    vote_average: Float
    vote_count: Int
    created_by: [CreatedBy!]
    episode_run_time: [Int!]
    first_air_date: String
    in_production: Boolean
    languages: [String]
    last_air_date: String
    last_episode_to_air: TEpisodeToAir
    name: String
    networks: [ProductionCompany!]
    next_episode_to_air: TEpisodeToAir
    number_of_episodes: Int
    number_of_seasons: Int
    origin_country: [String]
    original_name: String
    seasons: [Season]
    type: String
  }

  type BelongsToCollection {
    backdrop_path: String
    id: Int
    name: String
    poster_path: String
  }

  type CreatedBy {
    credit_id: String
    gender: Int
    id: Int
    name: String
    profile_path: String
  }

  type Genre {
    id: Int
    name: String
  }

  type ProductionCompany {
    id: Int!
    logo_path: String
    name: String
    origin_country: String
  }

  type ProductionCountry {
    iso_3166_1: String
    name: String
  }

  type SpokenLanguage {
    english_name: String
    iso_639_1: String
    name: String
  }

  type Season {
    air_date: String
    episode_count: Int
    id: Int
    name: String
    overview: String
    poster_path: String
    season_number: Int
  }

  type TEpisodeToAir {
    air_date: String
    episode_number: Int
    id: Int
    name: String
    overview: String
    production_code: String
    season_number: Int
    still_path: String
    vote_average: Float
    vote_count: String
  }

  interface IStandardApiResp {
    page: Int!
    total_pages: Int!
    total_results: Int!
  }

  type IStandardMovieApiResp implements IStandardApiResp {
    page: Int!
    results: [Movie!]!
    total_pages: Int!
    total_results: Int!
  }

  type IStandardShowApiResp implements IStandardApiResp {
    page: Int!
    results: [Show!]!
    total_pages: Int!
    total_results: Int!
  }
`
