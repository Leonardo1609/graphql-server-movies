import { IMovie, IShow } from '../../interfaces/movieApi.interface'

const Item = {
  __resolveType(obj: IMovie & IShow): 'Movie' | 'Show' | null {
    if (obj.title) {
      return 'Movie'
    }

    if (obj.name) {
      return 'Show'
    }

    return null
  },
}

export const movieApiResolvers = {
  Item,
}
