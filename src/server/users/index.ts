import request from '@/server'

import * as userTypes from './types'

// 获取用户列表
export const getUserList = (params: userTypes.IUserParams) => {
  return request.get<userTypes.IUserList>({
    url: '/user',
    params
  })
}

// 修改用户信息
export const updateUser = (params: userTypes.IUserParams) => {
  return request.put({
    url: `/user/update/${params.id}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 修改用户状态
export const updateUserStatus = (userId: number, status: number) => {
  return request.put({
    url: `/user/status/${userId}`,
    data: {
      status
    }
  })
}

// 新增用户
export const createUser = (data: any) => {
  return request.post({
    url: '/user',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 删除用户
export const deleteByIdUser = (id: number) => {
  return request.delete({
    url: `/user`,
    params: {
      id
    }
  })
}
