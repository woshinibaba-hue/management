import { FormConfig } from '@/base_components/Form/types'

const valMobile = (_: any, value: any, callback: any) => {
  // 验证手机号正则
  const mobileReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (mobileReg.test(value)) {
    callback()
  } else {
    callback(new Error('手机号格式不正确'))
  }
}

export const formConfig: FormConfig = {
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
      lable: '邮箱 (禁止修改)',
      placeholder: '请输入邮箱',
      isDisabled: true
    },
    {
      field: 'mobile',
      type: 'number',
      lable: '手机号',
      placeholder: '请输入手机号'
    },
    {
      field: 'referral',
      type: 'textarea',
      lable: '个人简介',
      placeholder: '请输入个人简介'
    }
  ],
  colLayout: {
    span: 24
  },
  rules: {
    username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { validator: valMobile, trigger: 'blur' }
    ]
  }
}
