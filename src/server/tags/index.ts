import request from '@/server'

import { ITag, BaseTag } from './type'

// 查询标签
export const getTags = (name?: string) => {
  return request.get<ITag[]>({
    url: '/tag',
    params: {
      name
    }
  })
}

// 添加标签
export const createTag = (data: BaseTag) => {
  return request.post({
    url: '/tag',
    data
  })
}

// 编辑标签
export const updateTag = (data: ITag) => {
  return request.put({
    url: `/tag/${data.id}`,
    data
  })
}

// 删除标签
export const deleteTag = (id: number) => {
  return request.delete({
    url: `/tag/${id}`
  })
}
