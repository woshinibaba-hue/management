<template>
  <div class="page-search">
    <Form v-bind="searchConfig" v-model="formData" ref="formRef">
      <template #footer>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form } from '@/base_components/Form'

import { FormConfig } from '@/base_components/Form/types'

type IProps = {
  searchConfig: FormConfig
  modelValue: any
}

type IEmits = {
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'search'): void
}

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const formData = ref({ ...props.modelValue })
const formRef = ref<InstanceType<typeof Form>>()

const reset = () => {
  formRef.value?.clearFormData()
}

const search = () => {
  emits('search')
}

watchEffect(() => {
  emits('update:modelValue', formData.value)
})
</script>

<style scoped lang="less">
.page-search {
  // border-bottom: 2px dashed var(--el-border-color);
  // padding-bottom: 25px;
  box-sizing: border-box;

  padding: 20px;
  border-radius: 10px;

  background-color: #fff;
}
</style>
