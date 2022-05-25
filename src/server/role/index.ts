import request from '@/server'

import * as roleTypes from './type'

// 获取角色列表
export const getRoleList = (params: roleTypes.IRoleParams) => {
  return request.get<roleTypes.IRole[]>({
    url: '/role',
    params
  })
}

// 新增角色
export const addRole = (data: roleTypes.IRoleCreate) => {
  return request.post<roleTypes.IRoleCreate>({
    url: '/role',
    data
  })
}

// 删除角色
export const deleteRole = (id: number) => {
  return request.delete({
    url: `/role/${id}`
  })
}

// 编辑角色
export const editRole = (id: number, data: roleTypes.IRoleCreate) => {
  return request.put<roleTypes.IRoleCreate>({
    url: `/role/${id}`,
    data
  })
}
