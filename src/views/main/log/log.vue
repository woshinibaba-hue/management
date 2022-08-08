<template>
  <div class="log">
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="tableConfig"
      :data="logList?.list"
      :total="logList?.total"
      @changePage="changePage"
      @changeSize="changeSize"
    />
  </div>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table'

import { usePageContent } from '@/hooks'

import { getLogList, LogList } from '@/server/log'

const logList = ref<LogList>()

const { changePage, changeSize, paginationInfo } = usePageContent()

// 当页码或者每页条数改变时，重新获取数据
watch(
  () => paginationInfo.value,
  () => {
    console.log(111)
    getLogList({
      offset:
        paginationInfo.value.currentSize *
        (paginationInfo.value.currentPage - 1),
      size: paginationInfo.value.currentSize
    }).then((res) => {
      logList.value = res.data
    })
  },
  { deep: true, immediate: true }
)
</script>
