import { FormConfig } from '@/base_components/Form/types'

export const dialogConfig: FormConfig = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      lable: '友链名称',
      placeholder: '请输入友链名称'
    },
    {
      field: 'referral',
      type: 'input',
      lable: '友链描述',
      placeholder: '请输入友链描述'
    },
    {
      field: 'cover',
      type: 'input',
      lable: '友链封面',
      placeholder: '请输入友链封面'
    },
    {
      field: 'link',
      type: 'input',
      lable: '友链链接',
      placeholder: '请输入友链链接'
    }
  ],
  colLayout: {
    span: 24
  },
  rules: {
    name: [{ required: true, message: '请输入友链名称', trigger: 'blur' }],
    referral: [{ required: true, message: '请输入友链描述', trigger: 'blur' }],
    cover: [{ required: true, message: '请输入友链封面', trigger: 'blur' }],
    link: [{ required: true, message: '请输入友链链接', trigger: 'blur' }]
  }
}
