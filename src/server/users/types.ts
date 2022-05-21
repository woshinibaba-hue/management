type IBaseUser = {
  id?: number
  username?: string
  mobile?: string
  email?: string
  status?: number | string
  auto?: number | string
}

export interface IUserParams extends IBaseUser {
  offset?: number
  limit?: number
}

export interface IUser extends IBaseUser {
  avatar?: string
  createtime?: string
}

export interface IUserList {
  users: IUser[]
  count: number
}
