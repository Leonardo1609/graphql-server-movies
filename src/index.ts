import TheMovieApi from '../datasources/theMovieApi'
import dotenv from 'dotenv'
import { IResolvers } from '@graphql-tools/utils'
import { gql, ApolloServer } from 'apollo-server'
import { movieApiQueries } from '../graphql/movie-api/queries'
import { typesMovieApi } from '../graphql/movie-api/types'
import { authMiddleware } from '../middlewares/auth.middleware'
import { usersMutations } from '../graphql/users/mutations'
import { usersQueries } from '../graphql/users/queries'

dotenv.config()

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    biography: String
    profileImage: String
    token: String
    expires: String
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
    verifyUser: VerifyUserResp
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String!): String
    login(email: String!, password: String!): String
  }

  type VerifyUserResp {
    user: User
    token: String
  }
`

const resolvers: IResolvers<undefined, any, Record<string, any>, any> = {
  Query: {
    ...movieApiQueries,
    ...usersQueries,
  },
  Mutation: {
    ...usersMutations,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return authMiddleware(req)
  },
  dataSources: () => ({
    movieApi: new TheMovieApi(),
  }),
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is already running at ${url}`)
})
