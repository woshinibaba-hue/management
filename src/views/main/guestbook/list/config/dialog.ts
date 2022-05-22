import { FormConfig } from '@/base_components/Form/types'

export const dialogConfig: FormConfig = {
  formItems: [
    {
      field: 'content',
      type: 'input',
      lable: '留言内容',
      placeholder: '请输入留言内容'
    }
  ],
  colLayout: {
    span: 24
  },
  rules: {
    content: [{ required: true, message: '请输入留言内容', trigger: 'blur' }]
  }
}
