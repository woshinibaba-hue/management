<template>
  <div class="user">
    <PageContent
      :contentTableConfig="tableConfig"
      :data="users"
      @edit="editUser"
    />

    <PageDialog
      v-model="dialogFormVisible"
      :formConfig="dialogConfig"
      title="编辑用户"
      pageName="user"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { PageContent } from '@/components/page-content'
import { PageDialog } from '@/components/page-dialog'

import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import { getUserList } from '@/server/users'
import * as userTypes from '@/server/users/types'

// 获取用户列表
const users = ref<userTypes.IUser[]>([])
getUserList({}).then((res) => {
  users.value = res.data
})

// 控制弹窗展示
const dialogFormVisible = ref(false)
// 修改用户信息，且展示弹窗
const editUser = (user: userTypes.IUser) => {
  dialogFormVisible.value = true
  console.log(user)
}
</script>

<style scoped></style>
