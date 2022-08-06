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
            <el-form-item
              :label="item.lable"
              :prop="item.field"
              inline-message
              v-if="!item.isHide"
            >
              <template
                v-if="
                  item.type === 'input' ||
                  item.type === 'password' ||
                  item.type === 'number' ||
                  item.type === 'textarea'
                "
              >
                <el-input
                  v-model="formData[item.field]"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :disabled="item.isDisabled"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  v-model="formData[item.field]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'colorpicker'">
                <el-color-picker
                  v-model="formData[item.field]"
                  color-format="rgb"
                />
              </template>
              <template v-else-if="item.type === 'tag' && formData.color">
                <el-tag :color="formData.color" style="color: #fff">
                  {{ formData.name ?? '展示示例' }}
                </el-tag>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import {
//   ref,
//   watch,
//   defineProps,
//   defineEmits,
//   defineExpose,
//   withDefaults
// } from 'vue'

// import { ElForm, FormRules } from 'element-plus'

import { FormRules } from 'element-plus'
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
  labelPosition?: 'left' | 'top' | 'right'
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
    console.log(newValue)
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

// 清空表单数据
const clearFormData = () => {
  formRef.value?.resetFields()
}

// 对外暴露的方法
defineExpose({
  verifyForm,
  removeFormError,
  clearFormData
})

// 使用model-value方式实现双向数据绑定
// const updateModelValue = (value: any, name: string) => {
//   emits('update:modelValue', {
//     ...props.modelValue,
//     [name]: value
//   })
// }
</script>

<style scoped lang="less">
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
