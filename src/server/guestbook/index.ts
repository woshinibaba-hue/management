import request from '@/server'

import * as guestbookType from './types'

// 查询留言
export const getGuestbook = (params: any) => {
  return request.get<{ count: number; data: guestbookType.IGuestbook[] }>({
    url: '/guestbook',
    params
  })
}

// 新增留言
export const addGuestbook = (data: guestbookType.IGuestbook) => {
  return request.post({
    url: '/guestbook',
    data
  })
}

// 修改留言
export const updateGuestbook = (data: guestbookType.IGuestbook) => {
  return request.put({
    url: '/guestbook',
    data
  })
}

// 删除留言
export const deleteGuestbook = (params: guestbookType.IGuestbookParams) => {
  return request.delete({
    url: '/guestbook',
    params
  })
}
