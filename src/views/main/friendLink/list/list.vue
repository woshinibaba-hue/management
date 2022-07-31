<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLink } from '@/store'

import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import { LinkType } from '@/server/link/type'

const linkStore = useLink()

const { passLink } = storeToRefs(linkStore)

linkStore.getAll()

const deleteLink = (link: LinkType) => {
  linkStore.removerLink(link.id)
}

// 控制弹窗展示
const dialogFormVisible = ref(false)
const defaultFormData = ref()

const editLink = (link: LinkType) => {
  dialogFormVisible.value = true
  defaultFormData.value = link
}

const confirm = (data: any) => {
  linkStore.editLink(data, defaultFormData.value.id)
}
</script>

<template>
  <div class="friend-link-list">
    <PageContent
      :contentTableConfig="tableConfig"
      :data="passLink"
      @delete="deleteLink"
      @edit="editLink"
    />

    <PageDialog
      v-model="dialogFormVisible"
      :form-config="dialogConfig"
      page-name="link"
      title="编辑友链"
      :default-form-data="defaultFormData"
      @confirm="confirm"
    />
  </div>
</template>
