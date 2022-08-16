import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      label: '查看更多',
      'min-width': 80
    },
    {
      prop: 'name',
      label: '权限(菜单)名称',
      'min-width': 100,
      slotName: 'name'
    },
    {
      prop: 'icon',
      label: '权限(菜单)图标',
      'min-width': 100,
      slotName: 'icon'
    },
    {
      prop: 'type',
      label: '权限(菜单)类型',
      'min-width': 100,
      slotName: 'type'
    },
    {
      prop: 'url',
      label: '权限(菜单)路径',
      'min-width': 150,
      slotName: 'url'
    },
    {
      prop: 'permission',
      label: '权限(功能)标识',
      'min-width': 230,
      slotName: 'permission'
    },
    {
      prop: 'createtime',
      label: '创建时间',
      'min-width': 150,
      slotName: 'createtime'
    }
  ],
  showColumnIndex: false,
  showColumnSelect: false,
  title: '权限管理 (菜单管理)',
  showFooter: false,
  pageName: 'power'
}
