<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
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
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;

    .main {
      width: 100%;
    }
  }
}
</style>
