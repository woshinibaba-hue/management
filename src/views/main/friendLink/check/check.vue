<template>
  <div class="friend-link-check">
    <PageContent
      :contentTableConfig="tableConfig"
      :data="link"
      @check="check"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'

import { auditLink } from '@/server/link'

import { tableConfig } from './config/table'
import { useLink } from '@/store'

const linkStore = useLink()

const { link } = storeToRefs(linkStore)

const check = async (check: number, id: number) => {
  await auditLink(id, check)
  ElMessage({
    type: check === 1 ? 'success' : 'warning',
    message: check === 1 ? '审核通过' : '拒绝通过'
  })
  linkStore.getVerify(false)
}
</script>

<style scoped></style>
