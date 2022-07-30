import { FormConfig } from '@/base_components/Form/types'

export const dialogConfig: FormConfig = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      lable: '标签名称',
      placeholder: '请输入标签名称'
    },
    {
      field: 'color',
      type: 'colorpicker',
      lable: '标签颜色'
    },
    {
      field: 'parent_id',
      type: 'select',
      lable: '所属标签',
      placeholder: '请选择所属标签, 如果是一级标签, 无需选择',
      options: []
    },
    {
      field: 'image',
      type: 'upload',
      lable: '标签封面'
    }
  ],
  colLayout: {
    span: 24
  },
  rules: {
    name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }]
  }
}
