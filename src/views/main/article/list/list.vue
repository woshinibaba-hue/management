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
      :total="articleList?.total"
      :data="articleList?.articles ?? []"
      @edit="handleEditData"
      @delete="deleteArticle"
      @change-page="changePage"
      @change-size="changeSize"
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
import { searchConfig } from './config/search'
import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import * as articleServer from '@/server/article'

import * as articleTypes from '@/server/article/types'

import { PageContent } from '@/components/page-content'

// 控制弹窗展示
const dialogFormVisible = ref(false)

const pageContentRef = ref<InstanceType<typeof PageContent>>()

const searchParams = ref<articleTypes.IArticle>()

// 文章列表
const articleList = ref<articleTypes.IArticleList>()

// 获取文章列表
const getArticleListAction = async (params?: articleTypes.IArticleParams) => {
  const { data } = await articleServer.getArticleList(params)

  articleList.value = data
  data.articles.forEach((item, index) => {
    articleList?.value &&
      (articleList.value.articles[index].username = item.user.username)
  })
}

const defaultData = ref<{ title: string; content: string; id: number }>()

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

const pagination = reactive({
  limit: 10,
  page: 1
})

const changePage = (page: number) => {
  pagination.page = page
}

const changeSize = (size: number) => {
  pagination.limit = size
}

watchEffect(() => {
  getArticleListAction(pagination)
})
</script>

<style scoped lang="less"></style>
