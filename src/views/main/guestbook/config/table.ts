import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      label: '展开可看留言评论',
      'min-width': 110,
      slotName: 'expand'
    },
    {
      prop: 'content',
      label: '留言内容',
      'min-width': 200,
      slotName: 'content'
    },
    {
      prop: 'parent_comment',
      label: '被回复的留言信息',
      'min-width': 200,
      slotName: 'parent_comment'
    },
    {
      prop: 'user',
      label: '留言人',
      'min-width': 100,
      slotName: 'user'
    },
    {
      prop: 'createtime',
      label: '留言时间',
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
