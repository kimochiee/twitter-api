import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validate = (validator: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validator.map((validationCheck: any) => validationCheck.run(req)))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    return next()
  }
}
