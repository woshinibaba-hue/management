import request from '@/server'

import * as articleTypes from './types'

// 发布文章
export const publishArticle = (data: { title: string; content: string }) => {
  return request.post({
    url: '/article',
    data
  })
}

// 获取文章列表
export const getArticleList = (params?: articleTypes.IArticleParams) => {
  return request.get<articleTypes.IArticle[]>({
    url: '/article',
    params
  })
}

// 修改文章
export const updateArticle = (params: any) => {
  return request.put({
    url: '/article',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 删除文章
export const deleteByIdArticle = (id: number) => {
  return request.delete({
    url: '/article',
    params: {
      id
    }
  })
}
