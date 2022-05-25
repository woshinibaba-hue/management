<template>
  <div class="dialog">
    <el-dialog
      v-model="dialogFormVisible"
      :title="title"
      @closed="closed"
      destroy-on-close
    >
      <Form v-bind="formConfig" v-model="formData" ref="formRef" />
      <!-- 默认插槽 用于添加一些其它功能 -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closed">取消</el-button>
          <el-button type="primary" @click="closed(1)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

import { Form } from '@/base_components/Form'

import { FormConfig } from '@/base_components/Form/types'

type IProps = {
  modelValue: boolean
  formConfig: FormConfig
  title?: string
  pageName: string
  defaultFormData?: any
}

type IEmits = {
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm', formData: any): void
}

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

// 打开关闭弹窗
const dialogFormVisible = ref<boolean>(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    dialogFormVisible.value = props.modelValue
  }
)

const formData = ref<any>({})

watch(
  () => props.defaultFormData,
  () => {
    props.formConfig.formItems.forEach((item) => {
      if (props.defaultFormData) {
        formData.value[item.field] = props.defaultFormData[item.field]
      }
    })
  }
)

const formRef = ref<InstanceType<typeof Form>>()

// 关闭弹窗
const closed = (isConfirm?: number) => {
  if (isConfirm === 1) {
    formRef.value?.verifyForm((isValid) => {
      if (isValid) {
        emits('update:modelValue', false)
        emits('confirm', formData.value)
      }
    })
  } else {
    emits('update:modelValue', false)
    // 清空表单校验结果以及修改的表单值
    formRef.value?.removeFormError()
    formRef.value?.clearFormData()
  }
}
</script>

<style scoped lang="less"></style>
