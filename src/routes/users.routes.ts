import express from 'express'
const router = express.Router()

import { loginValidator, registerValidator } from '../middlewares/users.middlewares'
import { login, register } from '../controllers/users.controllers'

/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
router.post('/register', registerValidator, register)
router.post('/login', loginValidator, login)

export default router
