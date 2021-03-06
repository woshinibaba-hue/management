import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      prop: 'title',
      label: '文章标题',
      'min-width': 100,
      slotName: 'title'
    },
    {
      prop: 'content',
      label: '文章内容',
      'min-width': 200,
      slotName: 'content'
    },
    {
      prop: 'like_count',
      label: '点赞数量',
      'min-width': 80,
      slotName: 'like_count'
    },
    {
      prop: 'cover',
      label: '文章封面',
      'min-width': 130,
      slotName: 'cover'
    },
    {
      prop: 'username',
      label: '作者',
      'min-width': 80,
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
  title: '文章列表',
  showFooter: false,
  pageName: 'list'
}
