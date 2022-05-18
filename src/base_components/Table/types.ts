export interface IPropType {
  prop?: string
  label?: string
  'min-width'?: number
  slotName?: string
}

export interface ITableConfig {
  tableConfig: IPropType[]
  showColumnIndex?: boolean
  showColumnSelect?: boolean
  title: string
  showFooter?: boolean
  addBtnText: string
  pageName: string
}
