import { PrismaClient } from '@prisma/client'
import { ApolloError, AuthenticationError } from 'apollo-server'
import { IContext } from '../../interfaces/context.interface'
import { IRegisterItemData } from '../../interfaces/registers.interface'

const prisma = new PrismaClient()

const registerItem = async (
  _: undefined,
  { registerInput }: { registerInput: IRegisterItemData },
  { user }: IContext
) => {
  if (!user) throw new AuthenticationError('Unauthorized')

  try {
    const register = await prisma.register.create({
      data: {
        ...registerInput,
        userId: user.id,
      },
    })

    if (register) {
      return { ok: true }
    }
    return { ok: false }
  } catch (err) {
    console.log(err)
    throw new ApolloError('There was an error')
  }
}

export const registersMutations = {
  registerItem,
}
