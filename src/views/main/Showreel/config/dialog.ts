import { FormConfig } from '@/base_components/Form/types'

export const dialogConfig: FormConfig = {
  formItems: [
    {
      field: 'title',
      type: 'input',
      lable: '作品名称',
      placeholder: '请输入作品名称'
    },
    {
      field: 'description',
      type: 'input',
      lable: '作品描述',
      placeholder: '请输入作品描述'
    },
    {
      field: 'link',
      type: 'input',
      lable: '作品链接',
      placeholder: '请输入作品链接'
    },
    {
      field: 'cover',
      type: 'upload',
      lable: '作品封面'
    }
  ],
  colLayout: {
    span: 24
  },
  rules: {
    title: [{ required: true, message: '作品名称不能为空', trigger: 'blur' }],
    description: [
      { required: true, message: '作品描述不能为空', trigger: 'blur' }
    ],
    link: [{ required: true, message: '作品链接不能为空', trigger: 'blur' }]
  }
}
