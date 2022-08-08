import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      prop: 'errormessage',
      label: '请求状态',
      'min-width': 100,
      slotName: 'error'
    },
    {
      prop: 'errormessage',
      label: '失败信息',
      'min-width': 150,
      slotName: 'errormessage'
    },
    {
      prop: 'ip',
      label: '访问者 IP',
      'min-width': 150,
      slotName: 'ip'
    },
    {
      prop: 'address',
      label: '访问者所在地',
      'min-width': 100,
      slotName: 'address'
    },
    {
      prop: 'device',
      label: '访问者设备信息',
      'min-width': 100,
      slotName: 'device'
    },
    {
      prop: 'path',
      label: '请求URL地址',
      'min-width': 100,
      slotName: 'path'
    },
    {
      prop: 'method',
      label: '请求方法',
      'min-width': 100,
      slotName: 'method'
    },
    {
      prop: 'query',
      label: '携带的query参数',
      'min-width': 110,
      slotName: 'query'
    },
    {
      prop: 'body',
      label: '携带的body参数',
      'min-width': 110,
      slotName: 'body'
    }
  ],
  showColumnIndex: true,
  showColumnSelect: false,
  title: '日志管理',
  showFooter: true,
  pageName: 'log'
}
