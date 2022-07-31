export interface IMenu {
  id: number
  name: string
  type: number
  url: string | null
  icon: any
  parentId: number | null
  permission: string | null
  children: IMenu[]
}

export interface IMenuRes {
  id: number
  intro: string
  name: string
  type: number
  menuList: IMenu[]
}
