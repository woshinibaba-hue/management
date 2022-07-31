import request from '@/server'

import { LinkDataType, BaseLinkType } from './type'

// 获取链接列表
export function getLink(status = 1) {
  return request.get<LinkDataType>({
    url: '/link',
    params: {
      status
    }
  })
}

// 审核链接
export function auditLink(id: number, status: number) {
  return request.put({
    url: `/link/${id}/verify`,
    data: {
      status
    }
  })
}

// 删除链接
export function deleteLink(id: number) {
  return request.delete({
    url: `/link/${id}`
  })
}

// 编辑链接
export function editLink(id: number, data: BaseLinkType) {
  return request.put({
    url: `/link/${id}`,
    data
  })
}
