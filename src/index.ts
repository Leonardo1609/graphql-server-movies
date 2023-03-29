import TheMovieApi from '../datasources/theMovieApi'
import dotenv from 'dotenv'
import { IResolvers } from '@graphql-tools/utils'
import { gql, ApolloServer } from 'apollo-server'
import { movieApiQueries } from '../graphql/movie-api/queries'
import { schemaMovieApi } from '../graphql/movie-api/schema'
import { authMiddleware } from '../middlewares/auth.middleware'
import { usersMutations } from '../graphql/users/mutations'
import { usersQueries } from '../graphql/users/queries'
import { schemaRegisters } from '../graphql/registers/schema'
import { registersResolvers } from '../graphql/registers/resolvers'
import { registersMutations } from '../graphql/registers/mutations'
import { registerQueries } from '../graphql/registers/queries'
import { movieApiResolvers } from '../graphql/movie-api/resolvers'

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

  enum ItemType {
    MOVIE
    TV
  }

  # MovieAPI Schema
  ${schemaMovieApi}

  # Register Schema
  ${schemaRegisters}

  type SuccessAnswer {
    ok: Boolean
  }

  type IStandardRespWithPages {
    page: Int
    totalPages: Int
    totalItems: Int
    items: [Register!]!
  }

  type Query {
    # MovieAPI Queries
    getVideos(itemId: Int, type: ItemType): VideosResponse
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

    # User Queries
    verifyUser: VerifyUserResp

    # Registers Queries
    getRegister(apiId: Int!): Register
    getRegisters: [Register!]!
    getWatchlist(page: Int!): IStandardRespWithPages
    getItemsLiked(page: Int!): IStandardRespWithPages
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String!): String
    login(email: String!, password: String!): String
    registerItem(registerInput: RegisterInput): SuccessAnswer
  }

  type VerifyUserResp {
    user: User
    token: String
  }
`

const resolvers: IResolvers<undefined, any, Record<string, any>, any> = {
  ...movieApiResolvers,
  ...registersResolvers,
  Query: {
    ...movieApiQueries,
    ...usersQueries,
    ...registerQueries,
  },
  Mutation: {
    ...usersMutations,
    ...registersMutations,
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
