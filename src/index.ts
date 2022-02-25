import TheMovieApi from '../datasources/theMovieApi'
import dotenv from 'dotenv'
import { IResolvers } from '@graphql-tools/utils'
import { gql, ApolloServer } from 'apollo-server'
import { movieApiQueries } from '../graphql/movie-api/queries'
import { typesMovieApi } from '../graphql/movie-api/types'

dotenv.config()

const typeDefs = gql`
  type User {
    biography: String!
    id: Int!
    profileImage: String!
    username: String!
  }

  type Register {
    apiId: Int!
    id: Int!
    itemType: ItemType!
    liked: Boolean
    name: String!
    registeredAt: String
    review: String
    score: Int
    watched: Boolean
    watchedAt: String
    watchlist: Boolean
  }

  ${typesMovieApi}

  enum ItemType {
    MOVIE
    TV
  }

  type Query {
    getCredits(itemId: Int, type: ItemType): CreditsResponse
    getGenres(itemType: ItemType): [Genre!]!
    getMovie(movieId: Int): Movie
    getNowPlayingMovies(page: Int): IStandardMovieApiResp
    getShow(showId: Int): Show
    getShowsInAiring(page: Int): IStandardShowApiResp
    getTopRatedMovies(page: Int): IStandardMovieApiResp
    getTopRatedShows(page: Int): IStandardShowApiResp
    searchMovies(query: String, page: Int): IStandardMovieApiResp
    searchShows(query: String, page: Int): IStandardShowApiResp
  }
`

const resolvers: IResolvers<undefined, any, Record<string, any>, any> = {
  Query: {
    ...movieApiQueries,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieApi: new TheMovieApi(),
  }),
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is already running at ${url}`)
})
