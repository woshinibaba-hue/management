<template>
  <div class="header">
    <div class="hamburger-container" @click="handleFold">
      <el-icon :size="25">
        <component :is="collapseState.isCollapse ? Expand : Fold" />
      </el-icon>
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>面包屑</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useCollapse } from '@/store'

import { Fold, Expand } from '@element-plus/icons-vue'

const collapseState = useCollapse()

const handleFold = () => {
  // collapseState.toggleCollapse()
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;

  height: 50px;

  background-color: #fff;

  .hamburger-container {
    padding: 0 15px;

    cursor: pointer;
  }
}
</style>
