import { IUser } from './../users/types'

export interface IGuestbookParams {
  id?: number
  key?: string
}

export interface IGuestbook {
  id: number
  content: string
  like_count: number
  user: IUser
  username?: string
}
