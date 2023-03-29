import { MovieOrShow } from './movieApi.interface'

export interface IRegisterItemData {
  apiId: number
  name: string
  itemType: MovieOrShow
  score: number
  watched: boolean
  watchlist: boolean
  liked: boolean
  review: string
  spoilers: boolean
  watchedAt?: Date
  registeredAt?: Date
  userId?: number
}
