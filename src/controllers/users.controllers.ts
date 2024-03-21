import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.services'
import { catchAsync } from '~/utils/catchAsync'

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User
  const { _id } = user

  const result = await usersService.login(_id?.toString() ?? '')

  res.status(200).json({ message: 'Login success', result })
})

export const register = catchAsync(
  async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response, next: NextFunction) => {
    const user = await usersService.register(req.body)

    res.status(200).json({ message: 'Register success', user })
  }
)

export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Logout success' })
})
