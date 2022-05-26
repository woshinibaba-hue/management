<template>
  <div class="comment">
    <PageSearch v-model="searchParams" :searchConfig="searchConfig" />
    <PageContent :content-table-config="tableConfig" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { PageSearch } from '@/components/page-search'
import { PageContent } from '@/components/page-content'

import { searchConfig } from './config/search'
import { tableConfig } from './config/table'

const searchParams = ref()
</script>

<style scoped lang="less"></style>
