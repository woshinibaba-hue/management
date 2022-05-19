import { FormRules } from 'element-plus'

type Type = 'input' | 'password' | 'select' | 'datepicker' | 'number'

export type fromItem = {
  field: string
  type: Type
  lable: string
  placeholder?: string
}

export type FormConfig = {
  formItems: fromItem[]
  colLayout?: {
    xl?: number
    lg?: number
    md?: number
    sm?: number
    xs?: number
    span?: number
  }
  labelPosition?: 'left' | 'top'
  rules?: FormRules
}
