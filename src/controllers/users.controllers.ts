import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
import usersService from '~/services/users.services'
import { catchAsync } from '~/utils/catchAsync'

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login success' })
}

export const register = catchAsync(
  async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response, next: NextFunction) => {
    const user = await usersService.register(req.body)

    res.status(200).json({ message: 'Register success', user })
  }
)
