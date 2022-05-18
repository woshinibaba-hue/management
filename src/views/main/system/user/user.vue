<template>
  <div class="user">
    <PageContent :contentTableConfig="tableConfig" :users="users" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { PageContent } from '@/components/page-content'
import { tableConfig } from './config/table'

import { getUserList } from '@/server/users'

import * as userTypes from '@/server/users/types'

const users = ref<userTypes.IUser[]>([])

getUserList({}).then((res) => {
  users.value = res.data
})
</script>

<style scoped></style>
