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
  </div>
</template>

<script setup lang="ts">
import { searchConfig } from './config/search'
import { tableConfig } from './config/table'

import { useArticle } from '@/store'

import * as articleServer from '@/server/article'

import * as articleTypes from '@/server/article/types'

import { PageContent } from '@/components/page-content'
import router from '@/router'

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

// 查询文章列表
const search = async () => {
  getArticleListAction(searchParams.value)
}

const { setArticleDetail } = useArticle()

// 修改文章
const handleEditData = (row: articleTypes.IArticle) => {
  setArticleDetail({
    id: row.id,
    title: row.title,
    content: row.content,
    description: row.description,
    cover: row.cover ?? null,
    tags: row.tags?.map((tag) => tag.id) ?? [],
    isTop: row.isTop,
    isComment: row.isComment
  })
  router.push('/main/article/create')
}

// 删除文章
const deleteArticle = async (row: any) => {
  await articleServer.deleteByIdArticle(row.id)
  ElMessage.success('删除成功')
  getArticleListAction(pagination)
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
