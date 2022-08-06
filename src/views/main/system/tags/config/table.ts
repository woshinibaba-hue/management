import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      prop: 'name',
      label: '标签名称',
      'min-width': 100,
      slotName: 'name'
    },
    {
      prop: 'cover',
      label: '标签封面',
      'min-width': 100,
      slotName: 'cover'
    },
    {
      prop: 'color',
      label: '标签示例',
      'min-width': 100,
      slotName: 'color'
    },
    {
      prop: 'createtime',
      label: '创建时间',
      'min-width': 200,
      slotName: 'createtime'
    },
    {
      label: '操作',
      'min-width': 200,
      slotName: 'handler'
    }
  ],
  showColumnIndex: true,
  showColumnSelect: false,
  title: '标签管理',
  showFooter: false,
  addBtnText: '添加标签',
  pageName: 'tag'
}
