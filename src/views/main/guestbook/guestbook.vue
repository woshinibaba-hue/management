<template>
  <div class="guestbook">
    <PageSearch
      v-model="searchParams"
      :search-config="searchConfig"
      @search="search"
    />

    <PageContent
      :content-table-config="tableConfig"
      :data="guestbookList"
      @edit="handleEditData"
      @header-click="handleNewData"
      @delete="deleteGuestbook"
    />

    <PageDialog
      v-model="dialogFormVisible"
      :default-form-data="defaultFormData"
      :title="title"
      :form-config="dialogConfig"
      pageName="guestbook"
      @confirm="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { searchConfig } from './config/search'
import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import { usePageDialog } from '@/hooks/usePageDialog'

import * as guestbookServer from '@/server/guestbook'
import * as guestbookTypes from '@/server/guestbook/types'

// 控制弹窗展示
const dialogFormVisible = ref(false)

const title = ref('添加留言 (暂时只能添加顶级留言)')

const searchParams = ref<guestbookTypes.IGuestbookParams>()

// 留言列表
const guestbookList = ref<guestbookTypes.IGuestbook[]>([])

// 获取留言列表
const getGuestbookList = async (
  params: guestbookTypes.IGuestbookParams = {}
) => {
  const res = await guestbookServer.getGuestbook(params)

  guestbookList.value = res.data.data
}

getGuestbookList()

// 搜索留言
const search = () => {
  getGuestbookList(searchParams.value)
}

// 弹窗展示
const createCb = () => {
  title.value = '添加留言 (暂时只能添加顶级留言)'
  dialogFormVisible.value = true
}
const editCb = () => {
  title.value = '编辑留言'
  dialogFormVisible.value = true
}

const { handleEditData, handleNewData, defaultFormData } =
  usePageDialog<guestbookTypes.IGuestbook>(createCb, editCb)

// 添加 、修改 留言
const handleSubmit = async (data: guestbookTypes.IGuestbook) => {
  if (defaultFormData.value?.content) {
    await guestbookServer.updateGuestbook({
      ...data,
      id: defaultFormData.value?.id
    })
    ElMessage.success('修改留言成功')
  } else {
    await guestbookServer.addGuestbook(data)
    ElMessage.success('新建留言成功')
  }
  getGuestbookList()
}

// 删除留言
const deleteGuestbook = async (row: guestbookTypes.IGuestbook) => {
  await guestbookServer.deleteGuestbook({ id: row.id })
  ElMessage.success('删除留言成功')
  getGuestbookList()
}
</script>

<style lang="scss" scoped></style>
