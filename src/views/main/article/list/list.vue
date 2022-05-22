<template>
  <div class="list">
    <PageSearch
      v-if="pageContentRef?.isQuery"
      :searchConfig="searchConfig"
      v-model="searchParams"
      @search="search"
    />

    <PageContent
      ref="pageContentRef"
      :content-table-config="tableConfig"
      :data="articleList"
      @edit="handleEditData"
      @delete="deleteArticle"
    />

    <PageDialog
      v-model="dialogFormVisible"
      :form-config="dialogConfig"
      :defaultFormData="defaultData"
      title="修改文章"
      pageName="list"
      @confirm="confirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ElMessage } from 'element-plus'

import { PageContent } from '@/components/page-content'

import { searchConfig } from './config/search'
import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import * as articleServer from '@/server/article'

import * as articleTypes from '@/server/article/types'

// 控制弹窗展示
const dialogFormVisible = ref(false)

const pageContentRef = ref<InstanceType<typeof PageContent>>()

const searchParams = ref<articleTypes.IArticle>()

// 文章列表
const articleList = ref<articleTypes.IArticle[]>([])

// 获取文章列表
const getArticleListAction = async (params?: articleTypes.IArticle) => {
  const { data } = await articleServer.getArticleList(params)
  articleList.value = data
  data.forEach((item, index) => {
    articleList.value[index].username = item.user.username
  })
}

const defaultData = ref<{ title: string; content: string; id: number }>()

// 初始化文章列表
getArticleListAction()

// 查询文章列表
const search = async () => {
  getArticleListAction(searchParams.value)
}

// 修改文章
const handleEditData = (row: articleTypes.IArticle) => {
  dialogFormVisible.value = true
  defaultData.value = {
    id: row.id,
    title: row.title,
    content: row.content
  }
}
const confirm = async (data: any) => {
  await articleServer.updateArticle({ ...data, id: defaultData.value?.id })
  ElMessage.success('修改成功')
  getArticleListAction()
}

// 删除文章
const deleteArticle = async (row: any) => {
  await articleServer.deleteByIdArticle(row.id)
  ElMessage.success('删除成功')
  getArticleListAction()
}
</script>

<style scoped lang="less"></style>
