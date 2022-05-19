export interface ILogin {
  email: string
  password: string
}

export interface ILoginRes {
  username: string
  email: string
  mobile: string
  avatar: string
  referral: string
  token: string
  auto: number
}
