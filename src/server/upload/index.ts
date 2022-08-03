import request from '@/server'

import * as types from './types'

// 上传图片
// 上传至本地
// export const uploadFileImg = (formData: FormData) => {
//   return request.post<types.ImageType[]>({
//     url: '/upload/img',
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     data: formData
//   })
// }

// 上传至七牛云
export const uploadFileImg = () => {
  return request.post<{ uploadToken: string }>({
    url: '/upload/img'
  })
}

// 获取图片
export const getImgList = () => {
  return request.get<types.ImageType[]>({
    url: `/upload/img`
  })
}

// 删除图片
export const deleteImg = (key: string) => {
  return request.delete({
    url: `/upload/img/${key}`
  })
}
