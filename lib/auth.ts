import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { IUser } from '../interfaces/user.interface'

const prisma = new PrismaClient()

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<Boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

const userSelect = {
  biography: true,
  email: true,
  expires: true,
  id: true,
  profileImage: true,
  token: true,
  username: true,
}

export const getUser = async (userId: number): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { ...userSelect },
  })
  return user
}
