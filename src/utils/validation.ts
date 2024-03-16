import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { EntityError, ErrorWithStatus } from '~/models/Error'
import httpStatus from '~/constants/httpStatus'

export const validate = (validator: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validator.map((validationCheck: any) => validationCheck.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const errorsObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })

    for (const key of Object.keys(errorsObject)) {
      const { msg } = errorsObject[key]

      if (msg instanceof ErrorWithStatus && msg.status !== httpStatus.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }

      entityError.errors[key] = errorsObject[key]
    }

    return next(entityError)
  }
}
