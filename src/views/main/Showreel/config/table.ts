import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      prop: 'title',
      label: '作品名称',
      'min-width': 100,
      slotName: 'title'
    },
    {
      prop: 'description',
      label: '作品描述',
      'min-width': 200,
      slotName: 'description'
    },
    {
      prop: 'cover',
      label: '作品封面',
      'min-width': 200,
      slotName: 'cover'
    },
    {
      prop: 'link',
      label: '作品地址',
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
  title: '作品集管理',
  showFooter: false,
  addBtnText: '添加作品',
  pageName: 'showreel'
}
