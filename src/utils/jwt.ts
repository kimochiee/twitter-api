import jwt from 'jsonwebtoken'
import { env } from '~/constants/env'

type SignTokenPayload = {
  payload: string | Buffer | object
  privateKey?: string
  options?: jwt.SignOptions
}

export const signToken = ({
  payload,
  privateKey = env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: SignTokenPayload) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) throw reject(err)

      resolve(token as string)
    })
  })
}
