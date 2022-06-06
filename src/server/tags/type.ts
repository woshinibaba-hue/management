export type BaseTag = {
  name: string
  cover: string
  parent_id?: number
}

export interface ITag extends BaseTag {
  id?: number
  createtime?: string
}
