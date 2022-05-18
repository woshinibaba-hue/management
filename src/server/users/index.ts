import request from '@/server'

import * as userTypes from './types'

// 获取用户列表
export const getUserList = (params: userTypes.IUserParams) => {
  return request.get<userTypes.IUser[]>({
    url: '/user',
    params
  })
}
