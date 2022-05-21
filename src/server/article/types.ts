import { IUser } from '../users/types'

export interface IArticle {
  id: number
  title: string
  content: string
  like_count: number
  cover?: string
  user: IUser
  username?: string
  createtime: string
}

export interface IArticleParams {
  id?: number
  key?: number
  limit?: number
  offset?: number
}
