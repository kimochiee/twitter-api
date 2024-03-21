import express from 'express'
const router = express.Router()

import { accessTokenValidator, loginValidator, registerValidator } from '../middlewares/users.middlewares'
import { login, logout, register } from '../controllers/users.controllers'

/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
router.post('/register', registerValidator, register)
/**
 * Description. Login a user
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
router.post('/login', loginValidator, login)
/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Headers: { Authorization: Bearer <access token> }
 * Body: { refresh_token: string }
 */
router.post('/logout', accessTokenValidator, logout)

export default router
