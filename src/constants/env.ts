import 'dotenv/config'

export const env = {
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN
}
