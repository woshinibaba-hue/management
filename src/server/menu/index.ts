import request from '@/server'

import { IMenuRes, IMenu } from './type'

// 查询用户菜单
export function getUserMenu() {
  return request.get<IMenuRes>({
    url: '/menu'
  })
}

// 查询所有菜单吗
export function getAllMenu() {
  return request.get<IMenu[]>({
    url: '/menu/all'
  })
}
