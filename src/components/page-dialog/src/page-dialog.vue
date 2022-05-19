<template>
  <div class="dialog">
    <el-dialog v-model="dialogFormVisible" :title="title" @closed="closed">
      <Form v-bind="formConfig" v-model="formData" ref="formRef" />
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
import { ref, watchEffect, defineProps, defineEmits } from 'vue'

import { Form } from '@/base_components/Form'

import { FormConfig } from '@/base_components/Form/types'

type IProps = {
  modelValue: boolean
  formConfig: FormConfig
  title: string
  pageName: string
}

type IEmits = {
  (e: 'update:modelValue', modelValue: boolean): void
}

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

// 打开关闭弹窗
const dialogFormVisible = ref<boolean>(props.modelValue)

watchEffect(() => {
  dialogFormVisible.value = props.modelValue
})

const formRef = ref<InstanceType<typeof Form>>()

// 关闭弹窗
const closed = (isConfirm?: number) => {
  if (isConfirm === 1) {
    formRef.value?.verifyForm((isValid) => {
      if (isValid) {
        emits('update:modelValue', false)
      }
    })
  } else {
    emits('update:modelValue', false)
    // 清空表单校验结果
    formRef.value?.removeFormError()
  }
}

// 表单数据
const formData = ref({
  username: '',
  email: '',
  mobile: ''
})
</script>

<style scoped lang="less"></style>
