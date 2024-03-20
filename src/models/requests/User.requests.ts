export interface RegisterReqBody {
  name: string
  email: string
  password: string
  // confirmPassword: string
  date_of_birth: string
}

export interface LoginReqBody {
  email: string
  password: string
}
