export type BaseLinkType = {
  cover: string
  link: string
  name: string
  referral: string
}

export interface LinkType extends BaseLinkType {
  id: number
  status: number
}

export type LinkDataType = {
  data: LinkType[]
  total: number
}
