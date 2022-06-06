import { FormRules } from 'element-plus'

type Type =
  | 'input'
  | 'password'
  | 'select'
  | 'datepicker'
  | 'number'
  | 'textarea'
  | 'upload'

export type fromItem = {
  field: string
  type: Type
  lable: string
  placeholder?: string
  options?: { title: string; value: string | number }[]
  isHide?: boolean
  isDisabled?: boolean
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
  labelPosition?: 'left' | 'top' | 'right'
  rules?: FormRules
  labelWidth?: string
}
