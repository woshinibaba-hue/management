<template>
  <div class="form">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.field">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.lable" :prop="item.field" inline-message>
              <el-input
                v-model="formData[item.field]"
                :type="item.type"
                :placeholder="item.placeholder"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  defineProps,
  defineEmits,
  defineExpose,
  withDefaults
} from 'vue'

import { ElForm, FormRules } from 'element-plus'

import { fromItem } from '../types'

type IProps = {
  formItems: fromItem[]
  modelValue: any
  colLayout?: {
    xl?: number
    lg?: number
    md?: number
    sm?: number
    xs?: number
    span?: number
  }
  labelWidth?: string
  labelPosition?: 'left' | 'top'
  rules?: FormRules
}

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: any): void
}>()

const props = withDefaults(defineProps<IProps>(), {
  colLayout: () => ({
    xl: 6,
    lg: 8,
    md: 12,
    xs: 24,
    sm: 24
  }),
  labelWidth: '80px',
  labelPosition: 'left'
})

const formRef = ref<InstanceType<typeof ElForm>>()

// 使用v-model方式实现双向数据绑定
const formData = ref({ ...props.modelValue })
watch(
  formData,
  (newValue) => {
    emits('update:modelValue', newValue)
  },
  {
    deep: true
  }
)

// 表单整体校验
const verifyForm = (valid: (isValid: boolean) => void) => {
  formRef.value?.validate((isValid) => {
    valid(isValid)
  })
}

// 移除表单校验结果
const removeFormError = () => {
  formRef.value?.clearValidate()
}

// 对外暴露的方法
defineExpose({
  verifyForm,
  removeFormError
})

// 使用model-value方式实现双向数据绑定
// const updateModelValue = (value: any, name: string) => {
//   emits('update:modelValue', {
//     ...props.modelValue,
//     [name]: value
//   })
// }
</script>

<style scoped lang="less"></style>