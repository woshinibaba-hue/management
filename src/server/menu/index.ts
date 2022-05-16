import request from '@/server'

import { IMenuRes } from './type'

// 查询用户菜单
export function getUserMenu() {
  return request.get<IMenuRes>({
    url: '/menu'
  })
}
