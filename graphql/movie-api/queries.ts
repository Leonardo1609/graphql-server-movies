import { IContext } from '../../interfaces/context.interface'
import {
  Genre,
  ICreditsResp,
  IMovie,
  INowPlayingMoviesResp,
  ISearchMoviesResp,
  ISearchShowsResp,
  IShow,
  IShowsInAiringResp,
  ITopMoviesResp,
  ITopShowsResp,
  MovieOrShow,
} from '../../interfaces/movieApi.interface'

interface IMovieApiQuery {
  [field: string]: (
    parent: undefined,
    args: any,
    context: IContext,
    info: any
  ) => any
}

export const movieApiQueries: IMovieApiQuery = {
  getMovie: async (
    _,
    { movieId }: { movieId: number },
    { dataSources }
  ): Promise<IMovie> => {
    return await dataSources.movieApi.getMovie(movieId)
  },
  getShow: async (
    _,
    { showId }: { showId: number },
    { dataSources }
  ): Promise<IShow> => {
    return await dataSources.movieApi.getShow(showId)
  },
  getCredits: async (
    _,
    { itemId, type }: { itemId: number; type: 'MOVIE' | 'TV' },
    { dataSources }
  ): Promise<ICreditsResp> => {
    return await dataSources.movieApi.getCredits(itemId, type)
  },
  searchMovies: async (
    _,
    { query, page }: { query: string; page: number },
    { dataSources }
  ): Promise<ISearchMoviesResp> => {
    return await dataSources.movieApi.searchMovies(query, page)
  },
  searchShows: async (
    _,
    { query, page }: { query: string; page: number },
    { dataSources }
  ): Promise<ISearchShowsResp> => {
    return await dataSources.movieApi.searchShows(query, page)
  },
  getNowPlayingMovies: async (
    _,
    { page }: { page: number },
    { dataSources }
  ): Promise<INowPlayingMoviesResp> => {
    return await dataSources.movieApi.getNowPlayingMovies(page)
  },
  getShowsInAiring: async (
    _,
    { page }: { page: number },
    { dataSources }
  ): Promise<IShowsInAiringResp> => {
    return await dataSources.movieApi.getShowsInAiring(page)
  },
  getTopRatedMovies: async (
    _,
    { page }: { page: number },
    { dataSources }
  ): Promise<ITopMoviesResp> => {
    return await dataSources.movieApi.getTopRatedMovies(page)
  },
  getTopRatedShows: async (
    _,
    { page }: { page: number },
    { dataSources }
  ): Promise<ITopShowsResp> => {
    return await dataSources.movieApi.getTopRatedShows(page)
  },
  getGenres: async (
    _,
    { itemType }: { itemType: MovieOrShow },
    { dataSources }
  ): Promise<Genre[]> => {
    return await dataSources.movieApi.getGenres(itemType)
  },
}
