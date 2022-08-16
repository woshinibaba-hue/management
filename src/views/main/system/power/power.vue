<template>
  <div class="power">
    <el-alert
      title="由于一些特殊原因，暂未开通，新增权限等功能，仅支持查看"
      type="info"
      effect="dark"
      :closable="false"
      show-icon
    />
    <PageContent :content-table-config="tableConfig" :data="menuData" />
  </div>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table'

import { getAllMenu } from '@/server/menu'

const menuData = ref<any>([])

getAllMenu().then((res) => {
  menuData.value = res.data
})
</script>

<style scoped></style>
