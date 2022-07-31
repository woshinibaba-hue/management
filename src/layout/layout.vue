<template>
  <div class="layout">
    <el-container>
      <el-aside class="aside">
        <Menu />
      </el-aside>
      <el-container>
        <Main />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Menu, Main } from './components'

import { useCollapse } from '@/store'
const collapseState = useCollapse()
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;

    .aside {
      width: v-bind("collapseState.isCollapse ? '60px': '200px'");
      overflow: hidden;
      transition: width 0.3s;
    }

    .main {
      width: 100%;
    }
  }
}
</style>
