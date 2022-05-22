import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      prop: 'content',
      label: '留言内容',
      'min-width': 200,
      slotName: 'content'
    },
    {
      prop: 'like_count',
      label: '留言点赞数',
      'min-width': 80,
      slotName: 'like_count'
    },
    {
      prop: 'username',
      label: '留言人',
      'min-width': 100,
      slotName: 'username'
    },
    {
      prop: 'createtime',
      label: '创建时间',
      'min-width': 150,
      slotName: 'createtime'
    },
    {
      label: '操作',
      'min-width': 150,
      slotName: 'handler'
    }
  ],
  showColumnIndex: true,
  showColumnSelect: false,
  showFooter: false,
  title: '留言列表',
  addBtnText: '添加留言',
  pageName: 'guestbook'
}
