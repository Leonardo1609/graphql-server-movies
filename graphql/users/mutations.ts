import { PrismaClient } from '@prisma/client'
import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server'
import { ICreateUser, ILoginUser } from '../../interfaces/user.interface'
import { comparePasswords, hashPassword } from '../../lib/auth'
import { createJwt } from '../../lib/token'

const prisma = new PrismaClient()

const createUser = async (
  _: undefined,
  { username, password, email }: ICreateUser
): Promise<string> => {
  let userFound = await prisma.user.findFirst({
    where: {
      username,
    },
  })

  if (userFound) {
    throw new ForbiddenError('Username already exists')
  }

  userFound = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (userFound) {
    throw new ForbiddenError('Email already exists')
  }

  const hashedPassword = await hashPassword(password)
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  })

  try {
    const token = await createJwt(newUser.id)
    if (!token) throw new Error()
    return token
  } catch (err) {
    throw new ApolloError('There was an error')
  }
}

const login = async (_: undefined, { email, password }: ILoginUser) => {
  const userExists = await prisma.user.findFirst({ where: { email } })
  if (!userExists) {
    throw new AuthenticationError('Invalid credentials')
  }

  const passwordsMatch = comparePasswords(password, userExists.password)
  if (!passwordsMatch) {
    throw new AuthenticationError('Invalid credentials')
  }

  try {
    const token = await createJwt(userExists.id)
    if (!token) throw new Error()
    return token
  } catch (err) {
    throw new ApolloError('There was an error')
  }
}

export const usersMutations = {
  createUser,
  login,
}
