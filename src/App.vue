<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import { useLink, useLoginStore } from '@/store'
const linkStore = useLink()
const loginStore = useLoginStore()
const { user } = storeToRefs(loginStore)

if (user.value?.auto === 1) {
  linkStore.getVerify()
}
</script>

<style lang="less"></style>
