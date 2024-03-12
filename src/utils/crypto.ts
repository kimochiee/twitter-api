import { createHash } from 'crypto'
import { env } from '~/constants/env'

const sha256 = (data: string): string => {
  return createHash('sha256').update(data).digest('hex')
}

export const hashPassword = (password: string): string => {
  return sha256(password + env.PASSWORD_SECRET)
}
