import { IMenu } from '@/server/menu/type'

export interface IRole {
  id: number
  type: number
  name: string
  intro: string
  menuList: IMenu[]
  createtime: string
}

export interface IRoleParams {
  roleId?: number
  offset?: number
  limit?: number
}
