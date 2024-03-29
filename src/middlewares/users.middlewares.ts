import { checkSchema } from 'express-validator'
import httpStatus from '~/constants/httpStatus'
import { userMessage } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Error'
import { databaseService } from '~/services/database.services'
import usersService from '~/services/users.services'
import { hashPassword } from '~/utils/crypto'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: userMessage.EMAIL_OR_PASSWORD_INCORRECT
        },
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })

            if (!user) {
              throw new ErrorWithStatus({ message: userMessage.USER_NOT_FOUND, status: 400 })
            }

            req.user = user

            return true
          }
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: userMessage.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: userMessage.PASSWORD_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 6,
            max: 20
          },
          errorMessage: userMessage.PASSWORD_MUST_BE_BETWEEN_6_AND_20_CHARACTERS
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
          },
          errorMessage: userMessage.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: userMessage.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: userMessage.NAME_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: userMessage.NAME_MUST_BE_BETWEEN_1_AND_100_CHARACTERS
        },
        trim: true
      },
      email: {
        notEmpty: {
          errorMessage: userMessage.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: userMessage.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value) => {
            const result = await usersService.checkEmailExist(value)

            if (result) {
              throw new ErrorWithStatus({ message: userMessage.EMAIL_ALREADY_EXISTED, status: 400 })
            }

            return result
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: userMessage.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: userMessage.PASSWORD_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 6,
            max: 20
          },
          errorMessage: userMessage.PASSWORD_MUST_BE_BETWEEN_6_AND_20_CHARACTERS
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
          },
          errorMessage: userMessage.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: userMessage.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: userMessage.CONFIRM_PASSWORD_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 6,
            max: 20
          },
          errorMessage: userMessage.CONFIRM_PASSWORD_MUST_BE_BETWEEN_6_AND_20_CHARACTERS
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
          },
          errorMessage: userMessage.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(userMessage.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH)
            }
            return true
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          },
          errorMessage: userMessage.DATE_OF_BIRTH_MUST_BE_ISO8601
        }
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        notEmpty: {
          errorMessage: userMessage.ACCESS_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value: string, { req }) => {
            const accessToken = value.split(' ')[1]

            if (!accessToken) {
              throw new ErrorWithStatus({
                message: userMessage.ACCESS_TOKEN_IS_REQUIRED,
                status: httpStatus.UNAUTHORIZED
              })
            }

            const decoded = await verifyToken({ token: accessToken })

            req.decoded_authorization = decoded
            return true
          }
        }
      }
    },
    ['headers']
  )
)
