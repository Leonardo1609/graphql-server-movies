import { RESTDataSource } from 'apollo-datasource-rest'
import { UserInputError } from 'apollo-server'
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
  IVideosResp,
  MovieOrShow,
} from '../interfaces/movieApi.interface'

class TheMovieApi extends RESTDataSource {
  private readonly movieApiKey: string = process.env.MOVIE_API_KEY || ''

  constructor() {
    super()
    this.baseURL = process.env.MOVIE_URL || ''
  }

  async getMovie(movieId: number): Promise<IMovie> {
    try {
      const resp: IMovie = await this.get(
        `${this.baseURL}movie/${movieId}?api_key=${this.movieApiKey}&language=en-US`
      )
      return resp
    } catch (err) {
      throw new UserInputError('There was an error')
    }
  }

  async getShow(showId: number): Promise<IShow> {
    try {
      const resp: IShow = await this.get(
        `${this.baseURL}tv/${showId}?api_key=${this.movieApiKey}&language=en-US`
      )
      return resp
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }

  async searchMovies(
    query: string,
    page: number = 1
  ): Promise<ISearchMoviesResp> {
    try {
      const resp: ISearchMoviesResp = await this.get(
        `${this.baseURL}search/movie?api_key=${this.movieApiKey}&language=en-US&page=${page}&query=${query}`
      )
      return resp
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }

  async searchShows(
    query: string,
    page: number = 1
  ): Promise<ISearchShowsResp> {
    try {
      const resp: ISearchShowsResp = await this.get(
        `${this.baseURL}search/tv?api_key=${this.movieApiKey}&language=en-US&page=${page}&query=${query}`
      )
      return resp
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }

  async getCredits(
    itemId: number,
    itemType: MovieOrShow
  ): Promise<ICreditsResp> {
    try {
      const resp: ICreditsResp = await this.get(
        `${
          this.baseURL
        }${itemType.toLocaleLowerCase()}/${itemId}/credits?api_key=${
          this.movieApiKey
        }&language=en-US`
      )
      return {
        cast: resp.cast,
        crew: resp.crew,
      }
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }

  async getNowPlayingMovies(page: number = 1): Promise<INowPlayingMoviesResp> {
    try {
      const resp: INowPlayingMoviesResp = await this.get(
        `${this.baseURL}movie/now_playing?api_key=${this.movieApiKey}&language=en-US&page=${page}`
      )
      return resp
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }

  async getShowsInAiring(page: number = 1): Promise<IShowsInAiringResp> {
    try {
      const resp: IShowsInAiringResp = await this.get(
        `${this.baseURL}tv/airing_today?&api_key=${this.movieApiKey}&language=en-US&page=${page}`
      )
      return resp
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }

  async getTopRatedMovies(page: number = 1): Promise<ITopMoviesResp> {
    try {
      const resp: ITopMoviesResp = await this.get(
        `${this.baseURL}movie/top_rated?api_key=${this.movieApiKey}&language=en-US&page=${page}`
      )
      return resp
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }

  async getTopRatedShows(page: number = 1): Promise<ITopShowsResp> {
    try {
      const resp: ITopShowsResp = await this.get(
        `${this.baseURL}tv/top_rated?api_key=${this.movieApiKey}&language=en-US&page=${page}`
      )
      console.log(resp)
      return resp
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }

  async getGenres(itemType: MovieOrShow): Promise<Genre[]> {
    try {
      const resp: {
        genres: Genre[]
      } = await this.get(
        `${this.baseURL}genre/${itemType.toLowerCase()}/list?api_key=${
          this.movieApiKey
        }&language=en-US`
      )
      return resp.genres
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }

  async getVideos(itemId: number, itemType: MovieOrShow): Promise<IVideosResp> {
    try {
      const resp: IVideosResp = await this.get(
        `${this.baseURL}/${itemType.toLowerCase()}/${itemId}/videos?api_key=${
          this.movieApiKey
        }&language=en-US`
      )
      return resp
    } catch (error) {
      throw new UserInputError('There was an error')
    }
  }
}

export default TheMovieApi
