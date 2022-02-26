import { ApolloError, AuthenticationError } from 'apollo-server'
import { IContext } from '../../interfaces/context.interface'
import { IUser } from '../../interfaces/user.interface'
import { getUser } from '../../lib/auth'
import { createJwt } from '../../lib/token'

const verifyUser = async (
  _: undefined,
  _args: null,
  { user }: IContext
): Promise<{ user: IUser; token: string }> => {
  if (!user) throw new AuthenticationError('Unauthorized')
  let userFound: IUser | null
  try {
    userFound = await getUser(user.id)
  } catch (error) {
    throw new ApolloError('There was an error')
  }

  if (!userFound) throw new AuthenticationError('Unauthorized')

  let token: string

  try {
    const jwtToken = await createJwt(userFound.id)
    if (!jwtToken) throw new Error()
    token = jwtToken
  } catch (err) {
    throw new ApolloError('Invalid token')
  }

  return {
    user: userFound,
    token,
  }
}

export const usersQueries = {
  verifyUser,
}
