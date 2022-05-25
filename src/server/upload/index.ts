import request from '@/server'

import * as types from './types'

// 上传图片
export const uploadFileImg = (formData: FormData) => {
  return request.post<types.ImageType[]>({
    url: '/upload/img',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

// 获取图片
export const getImgList = (id?: number) => {
  return request.get<types.ImageType[]>({
    url: `/upload/img`,
    params: {
      id
    }
  })
}

// 删除图片
export const deleteImg = (id: number) => {
  return request.delete({
    url: `/upload/img/${id}`
  })
}
