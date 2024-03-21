import jwt from 'jsonwebtoken'
import { env } from '~/constants/env'
import httpStatus from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Error'

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

export const verifyToken = ({ token, publicKey = env.JWT_SECRET as string }: { token: string; publicKey?: string }) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) throw reject(new ErrorWithStatus({ message: err.message, status: httpStatus.UNAUTHORIZED }))

      resolve(decoded as jwt.JwtPayload)
    })
  })
}
