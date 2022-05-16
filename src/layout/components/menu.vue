<template>
  <div class="menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="collapseState.isCollapse"
    >
      <el-menu-item index="1">
        <el-icon><Location /></el-icon>
        <span>嗯嗯嗯</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <span>哈哈哈</span>
        </template>
        <el-menu-item index="1-1"> item one </el-menu-item>
        <el-menu-item index="1-2">item one</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { Location } from '@element-plus/icons-vue'

import { useCollapse } from '@/store'
const collapseState = useCollapse()
</script>

<style scoped lang="less">
:deep(.el-menu) {
  border-right: 0;

  overflow: hidden;
  background-color: #304156;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  &:not(.el-menu-item.is-active) {
    color: #bfcbd9;
    transition: all 0.3s;
  }
  &:hover {
    background-color: #263445 !important;
  }
}

.menu {
  height: 100%;

  transition: all 0.3s;
  background-color: #304156;
}
</style>
