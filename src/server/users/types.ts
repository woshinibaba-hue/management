type IBaseUser = {
  id?: number
  username?: string
  mobile?: string
  email?: string
  status?: number
  auto?: number
}

export interface IUserParams extends IBaseUser {
  offset?: number
  limit?: number
}

export interface IUser extends IBaseUser {
  avatar?: string
  createtime?: string
}
