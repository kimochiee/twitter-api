import httpStatus from '~/constants/httpStatus'
import { userMessage } from '~/constants/message'

type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>

export class ErrorWithStatus {
  message: string
  status: number

  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorType

  constructor({ errors }: { errors: ErrorType }) {
    super({ message: userMessage.VALIDATION_ERROR, status: httpStatus.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
