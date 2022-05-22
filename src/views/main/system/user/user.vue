<template>
  <div class="user">
    <PageSearch
      v-if="pageContentRef?.isQuery"
      :searchConfig="searchComputedConfig"
      v-model="searchParams"
      @search="search"
    />

    <PageContent
      ref="pageContentRef"
      :contentTableConfig="tableConfig"
      :data="users?.users!"
      :total="users?.count!"
      @edit="handleEditData"
      @delete="deleteData"
      @changeStatus="changeStatus"
      @headerClick="handleNewData"
      @changePage="changePage"
      @changeSize="changeSize"
    />

    <PageDialog
      v-model="dialogFormVisible"
      :formConfig="dialogConfig"
      :defaultFormData="defaultFormData"
      :title="title"
      pageName="user"
      @confirm="confirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { PageContent } from '@/components/page-content'

import { searchConfig } from './config/search'
import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import { useUserStore, useLoginStore } from '@/store'

import { usePageContent, usePageDialog } from '@/hooks'

import * as userTypes from '@/server/users/types'

const pageContentRef = ref<InstanceType<typeof PageContent>>()

const loginStore = useLoginStore()
const userStore = useUserStore()
// 初始化用户列表
userStore.getUsers()
const { users } = storeToRefs(userStore)
const title = ref<string>()

// 控制弹窗展示
const dialogFormVisible = ref(false)

// 修改用户 / 添加用户
const confirm = (user: userTypes.IUser) => {
  if (!defaultFormData.value?.id) {
    userStore.addUser(user)
  } else {
    userStore.updateUser({ ...user, id: defaultFormData.value?.id })
  }
}

// 修改用户状态
const changeStatus = (status: number, id: number) => {
  userStore.updateStatus(id, status)
}

const searchComputedConfig = computed(() => {
  searchConfig.formItems.forEach((item) => {
    if (item.field === 'auto') {
      item.options = loginStore.roles.map((role) => ({
        title: role.name,
        value: role.id
      }))
    }
  })

  return searchConfig
})

// 查询用户列表
// 条件查询字段
const searchParams = ref<userTypes.IUserParams>({
  username: '',
  email: '',
  mobile: '',
  status: '',
  auto: ''
})
const search = () => {
  userStore.getUsers(searchParams.value)
}

const createCb = () => {
  dialogFormVisible.value = true
  title.value = '新增用户'
  dialogConfig.formItems.forEach((item) => {
    if (item.field === 'password') {
      item.isHide = false
    }
  })
}

const editCb = () => {
  dialogFormVisible.value = true
  title.value = '编辑用户'
  dialogConfig.formItems.forEach((item) => {
    if (item.field === 'password') {
      item.isHide = true
    }
  })
}

const { handleEditData, defaultFormData, handleNewData } =
  usePageDialog<userTypes.IUser>(createCb, editCb)

// 删除当前用户
const deleteData = (user: userTypes.IUser) => {
  user.id && userStore.deleteUser(user.id)
}

const { paginationInfo, changePage, changeSize } = usePageContent()

// 当分页改变时，查询用户列表
watch(paginationInfo.value, (newVal) => {
  userStore.getUsers({
    ...searchParams.value,
    limit: newVal.currentSize,
    offset:
      paginationInfo.value.currentSize * (paginationInfo.value.currentPage - 1)
  })
})
</script>

<style scoped></style>
