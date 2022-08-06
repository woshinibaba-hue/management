import { ITableConfig } from '@/base_components/Table/types'

export const tableConfig: ITableConfig = {
  tableConfig: [
    {
      prop: 'username',
      label: '姓名',
      'min-width': 100,
      slotName: 'username'
    },
    {
      prop: 'email',
      label: '邮箱',
      'min-width': 200,
      slotName: 'email'
    },
    {
      prop: 'mobile',
      label: '联系方式',
      'min-width': 200,
      slotName: 'mobile'
    },
    {
      prop: 'referral',
      label: '个性签名',
      'min-width': 100,
      slotName: 'referral'
    },
    {
      prop: 'role_name',
      label: '角色',
      'min-width': 100,
      slotName: 'role_name'
    },
    {
      prop: 'status',
      label: '是否启用',
      'min-width': 100,
      slotName: 'status'
    },
    {
      prop: 'createtime',
      label: '注册时间',
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
  title: '用户管理',
  showFooter: true,
  addBtnText: '添加用户',
  pageName: 'user'
}
