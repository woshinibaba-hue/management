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
      prop: 'tags',
      label: '文章标签',
      'min-width': 80,
      slotName: 'tags'
    },
    {
      prop: 'isTop',
      label: '是否置顶',
      'min-width': 80,
      slotName: 'isTop'
    },
    {
      prop: 'isComment',
      label: '是否可评论',
      'min-width': 100,
      slotName: 'isComment'
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
      'min-width': 100,
      slotName: 'username'
    },
    {
      prop: 'createtime',
      label: '发布时间',
      'min-width': 180,
      slotName: 'createtime'
    },
    {
      prop: 'updatetime',
      label: '更新时间',
      'min-width': 180,
      slotName: 'updatetime'
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
  showFooter: true,
  pageName: 'list'
}
