import request from '@/server'

// 上传图片
export const uploadFileImg = (formData: FormData) => {
  return request.post<string[]>({
    url: '/upload/img',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
