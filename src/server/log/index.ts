import request from '@/server'

export type Log = {
  id: number
  device: string
  ip: string
  address: string
  method: string
  path: string
  query: string
  body: string
  errormessage: string
}

export type LogList = {
  total: number
  list: Log[]
}

// 获取日志列表
export const getLogList = (params?: { size: number; offset: number }) => {
  return request.get<LogList>({
    url: '/log',
    params
  })
}

// 清空日志列表
export const clearLogList = () => {
  return request.delete({
    url: '/log'
  })
}
