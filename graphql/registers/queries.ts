import { PrismaClient } from '@prisma/client'
import { ApolloError, AuthenticationError } from 'apollo-server'
import { IContext } from '../../interfaces/context.interface'

const prisma = new PrismaClient()

interface IRegistersQuery {
  [field: string]: (
    parent: undefined,
    args: any,
    context: IContext,
    info: any
  ) => any
}

export const registerQueries: IRegistersQuery = {
  getRegister: async (_: undefined, { apiId }: { apiId: number }, { user }) => {
    if (!user) throw new AuthenticationError('Unauthorized')

    try {
      const registerFound = await prisma.register.findFirst({
        where: {
          apiId,
          userId: user.id,
        },
      })

      if (!registerFound) {
        return new ApolloError('Register not found', '404')
      }

      return registerFound
    } catch (err) {
      throw new ApolloError('There was an error')
    }
  },
  getWatchlist: async (_: undefined, { page }: { page: number }, { user }) => {
    if (!user) throw new AuthenticationError('Unauthorized')
    try {
      const registersWatchlistCount = await prisma.register.count({
        where: {
          watched: true,
        },
      })
      const totalPages = Math.ceil(registersWatchlistCount / 20)

      const skip = page < 1 ? 0 : (page - 1) * 20
      const take = skip + 20

      const registersWatchlist = await prisma.register.findMany({
        skip,
        take,
        where: {
          userId: user.id,
          watched: true,
        },
      })

      return {
        page,
        totalPages,
        totalItems: registersWatchlistCount,
        items: registersWatchlist,
      }
    } catch (err) {
      throw new ApolloError('There was an error')
    }
  },
  getItemsLiked: async (_: undefined, { page }: { page: number }, { user }) => {
    if (!user) throw new AuthenticationError('Unauthorized')
    try {
      const registersWatchlistCount = await prisma.register.count({
        where: {
          liked: true,
        },
      })
      const totalPages = Math.ceil(registersWatchlistCount / 20)

      const skip = page < 1 ? 0 : (page - 1) * 20
      const take = skip + 20

      const registersWatchlist = await prisma.register.findMany({
        skip,
        take,
        where: {
          userId: user.id,
          liked: true,
        },
      })

      return {
        page,
        totalPages,
        totalItems: registersWatchlistCount,
        items: registersWatchlist,
      }
    } catch (err) {
      throw new ApolloError('There was an error')
    }
  },
}
