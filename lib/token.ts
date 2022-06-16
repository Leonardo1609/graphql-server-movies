import jwt from 'jsonwebtoken'

export const createJwt = (userId: Number) => {
  return new Promise<string | undefined>((resolve, reject) => {
    if (!process.env.SECRET_KEY) reject('Key not found')

    jwt.sign(
      { user: { id: userId } },
      process.env.SECRET_KEY!,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          reject(err)
        }
        resolve(token)
      }
    )
  })
}
