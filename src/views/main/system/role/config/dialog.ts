import { FormConfig } from '@/base_components/Form/types'

export const dialogConfig: FormConfig = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      lable: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      lable: '角色描述',
      placeholder: '请输入角色描述'
    }
  ],
  colLayout: {
    span: 24
  },
  rules: {
    name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
    intro: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
  }
}
