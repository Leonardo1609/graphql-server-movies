import { User } from '@prisma/client'

export interface ICredentials {
  password: string
  email: string
}

export interface ICreateUser extends ICredentials {
  username: string
  password: string
  email: string
}

export interface ILoginUser extends ICredentials {}

export interface IUser extends Omit<User, 'password'> {}
