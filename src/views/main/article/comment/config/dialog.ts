import { FormConfig } from '@/base_components/Form/types'

export const dialogConfig: FormConfig = {
  formItems: [
    {
      field: 'title',
      type: 'input',
      lable: '标题',
      placeholder: '请输入标题'
    },
    {
      field: 'content',
      type: 'input',
      lable: '内容',
      placeholder: '请输入内容'
    }
  ],
  colLayout: {
    span: 24
  },
  rules: {
    title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
    content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
  }
}
