import request from '../index'

import { IDataResult } from '../request/types'
import * as types from './types'

// 登录
export function login(data: types.ILogin) {
  return request.post<IDataResult<types.ILoginRes>>({
    url: '/login',
    data
  })
}
