import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
import usersService from '~/services/users.services'

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login success' })
}

export const register = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await usersService.register(req.body)

    res.status(200).json({ message: 'Register success', user })
  } catch (error) {
    next(error)
  }
}
