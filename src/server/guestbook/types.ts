import { IUser } from './../users/types'

export interface IGuestbookParams {
  id?: number
  key?: string
}

export interface IGuestbook {
  id: number
  content: string
  createtime: string
  user: IUser
  parentId: number | null
  parent_comment?: {
    content: string
    username: string
  }
  children: IGuestbook[]
}
