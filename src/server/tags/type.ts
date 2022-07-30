export type BaseTag = {
  name: string
  cover: string
  color: string
  parent_id?: number
}

export interface ITag extends BaseTag {
  id: number
  createtime?: string
}
