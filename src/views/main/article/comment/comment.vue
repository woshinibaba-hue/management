<template>
  <div class="comment">
    <PageSearch v-model="searchParams" :searchConfig="searchConfig" />
    <PageContent :content-table-config="tableConfig" />
  </div>
</template>

<script setup lang="ts">
import { searchConfig } from './config/search'
import { tableConfig } from './config/table'

const searchParams = ref()
</script>

<style scoped lang="less"></style>
