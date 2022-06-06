import { FormConfig } from '@/base_components/Form/types'

export const searchConfig: FormConfig = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      lable: '关键字',
      placeholder: '请输入查询关键字'
    }
  ],
  labelWidth: '60px',
  labelPosition: 'right'
}
