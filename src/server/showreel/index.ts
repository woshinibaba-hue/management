import request from '@/server'

import { IShowreel } from './types.d'

// 查询作品集
export function getShowreelList() {
  return request.get<IShowreel[]>({
    url: '/showreel'
  })
}

// 新增作品集
export function addShowreel(data: IShowreel) {
  return request.post<IShowreel>({
    url: '/showreel',
    data
  })
}

// 修改作品集
export function updateShowreel(data: IShowreel) {
  return request.put({
    url: `/showreel/${data?.id}`,
    data
  })
}

// 删除作品集
export function deleteShowreel(id: number) {
  return request.delete({
    url: `/showreel/${id}`
  })
}
