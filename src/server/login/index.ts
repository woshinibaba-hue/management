import request from '../index'

import * as types from './types'

// 登录
export function login(data: types.ILogin) {
  return request.post<types.ILoginRes>({
    url: '/login',
    data
  })
}
