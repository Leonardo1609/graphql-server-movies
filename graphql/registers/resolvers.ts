import { IContext } from '../../interfaces/context.interface'
import { IMovie, IShow } from '../../interfaces/movieApi.interface'
import { IRegisterItemData } from '../../interfaces/registers.interface'

const Register = {
  item: async (
    parent: IRegisterItemData,
    _: any,
    { dataSources }: IContext
  ): Promise<IMovie | IShow> => {
    if (parent.itemType === 'MOVIE') {
      return await dataSources.movieApi.getMovie(parent.apiId)
    }
    return await dataSources.movieApi.getShow(parent.apiId)
  },
}

export const registersResolvers = {
  Register,
}
