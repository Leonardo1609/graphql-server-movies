import { gql } from 'apollo-server'

export const schemaRegisters = gql`
  input RegisterInput {
    apiId: Int
    name: String
    itemType: ItemType
    score: Float
    watched: Boolean
    watchlist: Boolean
    liked: Boolean
    review: String
    spoilers: Boolean
  }

  type Register {
    apiId: Int!
    name: String!
    itemType: ItemType!
    score: Float
    watched: Boolean
    watchlist: Boolean
    liked: Boolean
    review: String
    spoilers: Boolean!
    watchedAt: String
    registeredAt: String
    userId: Int!
    item: Item!
  }
`
