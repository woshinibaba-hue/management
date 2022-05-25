import { FormConfig } from '@/base_components/Form/types'

export const searchConfig: FormConfig = {
  formItems: [
    {
      field: 'key',
      type: 'input',
      lable: '关键字',
      placeholder: '请输入角色名称或者角色描述'
    }
  ],
  labelWidth: '60px',
  labelPosition: 'right'
}
