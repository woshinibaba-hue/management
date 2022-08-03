<template>
  <div class="profile">
    <div class="right">
      <div class="title">个人信息</div>
      <Form
        v-bind="formConfig"
        v-model="formData"
        ref="formRef"
        labelPosition="top"
      />
    </div>
    <div class="left">
      <div class="title">头像</div>
      <div class="avatar">
        <el-avatar :size="130" :src="avatar ? avatar : defaultAvatar" />
      </div>
      <el-upload :show-file-list="false" :http-request="upload">
        <el-button type="primary">上传头像</el-button>
      </el-upload>
    </div>
  </div>
  <el-button type="primary" @click="update">修改</el-button>
</template>

<script setup lang="ts">
import { Form } from '@/base_components/Form'

import { useLoginStore } from '@/store'

import { formConfig } from './config/form'

import { ILoginRes } from '@/server/login/types'

import { useUpload } from '@/hooks'

const loginStore = useLoginStore()

const defaultAvatar =
  'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'

const formData = ref<ILoginRes>()
const avatar = ref<string>()

if (loginStore.user) {
  formData.value = loginStore.user
  avatar.value = loginStore.user.avatar
}

const formRef = ref<InstanceType<typeof Form>>()

const update = () => {
  formRef.value?.verifyForm(async (valid) => {
    if (valid) {
      if (formData.value) {
        loginStore.updateUserById({
          ...formData.value,
          avatar: avatar.value
        })
      }
    }
  })
}

const { upload, url } = useUpload()

watchEffect(() => {
  if (url.value) {
    avatar.value = url.value
  }
})
</script>

<style scoped lang="less">
.profile {
  display: flex;
  height: 100%;

  .right {
    min-width: 224px;
    max-width: 448px;
    height: 100%;

    .title {
      font-weight: 700;
      margin-bottom: 20px;
    }
  }

  .left {
    flex: 1;
    height: 100%;
    margin-left: 100px;
  }

  .title {
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
  }

  :deep(.el-upload) {
    margin: 20px 0 0 20px;
  }
}
</style>
