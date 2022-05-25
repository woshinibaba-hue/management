import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      prop: 'name',
      label: '角色名称',
      'min-width': 100,
      slotName: 'name'
    },
    {
      prop: 'intro',
      label: '角色描述',
      'min-width': 200,
      slotName: 'intro'
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
  title: '角色管理',
  showFooter: false,
  addBtnText: '添加角色',
  pageName: 'role'
}
