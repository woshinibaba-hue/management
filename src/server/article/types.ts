import { IUser } from '../users/types'
import { ITag } from '../tags/type'

export interface IArticle {
  id: number
  title: string
  content: string
  cover?: string
  description: string
  tags: ITag[] | null
  user: IUser
  username?: string
  createtime: string
}

export interface IArticleParams {
  id?: number
  key?: number
  limit?: number
  page?: number
}

export interface PublishArticleParams {
  title: string
  content: string
  cover: string | null
  description: string
  tags: number[]
}

export type IArticleList = {
  articles: IArticle[]
  page: number
  total: number
}
