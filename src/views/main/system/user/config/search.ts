import { FormConfig } from '@/base_components/Form/types'

export const searchConfig: FormConfig = {
  formItems: [
    {
      field: 'username',
      type: 'input',
      lable: '姓名',
      placeholder: '请输入姓名'
    },
    {
      field: 'email',
      type: 'input',
      lable: '邮箱',
      placeholder: '请输入邮箱'
    },
    {
      field: 'mobile',
      type: 'number',
      lable: '手机号',
      placeholder: '请输入手机号'
    },
    {
      field: 'status',
      type: 'select',
      lable: '状态',
      placeholder: '请选择状态',
      options: [
        {
          title: '启用',
          value: 1
        },
        {
          title: '禁用',
          value: 0
        }
      ]
    },
    {
      field: 'auto',
      type: 'select',
      lable: '角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  labelWidth: '60px',
  labelPosition: 'right'
}
