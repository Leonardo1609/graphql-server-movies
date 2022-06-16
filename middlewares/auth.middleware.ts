import { ApolloError } from 'apollo-server'
import { Request } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request): { id: number } | null => {
  try {
    const token = req.headers['x-auth']

    // Can't throw errors because this middlewere will be apply for all request and when the server runs
    if (!token) {
      return null
    }

    if (typeof token !== 'string') {
      return null
    }

    const user = jwt.verify(token, process.env.SECRET_KEY || '') as {
      id: number
    }
    return user
  } catch (err) {
    throw new ApolloError('Invalid token')
  }
}
