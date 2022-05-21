import request from '@/server'

import * as roleTypes from './type'

// 获取角色列表
export const getRoleList = (params: roleTypes.IRoleParams) => {
  return request.get<roleTypes.IRole[]>({
    url: '/role',
    params
  })
}
