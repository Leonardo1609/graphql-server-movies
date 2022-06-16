import TheMovieApi from '../datasources/theMovieApi'

export interface IContext {
  dataSources: { movieApi: TheMovieApi }
  user?: { id: number }
}
