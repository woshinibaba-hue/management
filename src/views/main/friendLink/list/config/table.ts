import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      prop: 'name',
      label: '友链名称',
      'min-width': 100,
      slotName: 'name'
    },
    {
      prop: 'cover',
      label: '友链封面',
      'min-width': 100,
      slotName: 'cover'
    },
    {
      prop: 'referral',
      label: '友链描述',
      'min-width': 100,
      slotName: 'referral'
    },
    {
      prop: 'link',
      label: '友链地址',
      'min-width': 200,
      slotName: 'link'
    },
    {
      label: '操作',
      'min-width': 200,
      slotName: 'handler'
    }
  ],
  showColumnIndex: true,
  showColumnSelect: false,
  title: '审核友链',
  showFooter: false,
  pageName: 'link'
}
