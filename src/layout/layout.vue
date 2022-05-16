<template>
  <div class="layout">
    <el-row>
      <el-col :span="collapseStore.isCollapse ? 1 : 3">
        <Menu />
      </el-col>
      <el-col :span="collapseStore.isCollapse ? 23 : 21">
        <Main />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useCollapse } from '@/store'
import { Menu, Main } from './components'

const collapseStore = useCollapse()
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;

  .el-row {
    height: 100%;

    .el-col {
      transition: all 0.3s;
      overflow: hidden;
    }
  }
}
</style>
