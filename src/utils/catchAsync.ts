import { RequestHandler, Request, Response, NextFunction } from 'express'

export const catchAsync = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
    // try {
    //   await fn(req, res, next)
    // } catch (error) {
    //   next(error)
    // }
  }
}
