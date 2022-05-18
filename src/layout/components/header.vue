<template>
  <div class="header">
    <div>
      <div class="hamburger-container" @click="handleFold">
        <el-icon :size="25">
          <component :is="collapseState.isCollapse ? Expand : Fold" />
        </el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>面包屑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          :src="loginStatore.user?.avatar ?? defaultAcatar"
        />
        <span class="name">{{ loginStatore.user?.username }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useCollapse, useLoginStore } from '@/store'

import { Fold, Expand } from '@element-plus/icons-vue'

const collapseState = useCollapse()
const loginStatore = useLoginStore()

const handleFold = () => {
  // collapseState.toggleCollapse()
}

const defaultAcatar =
  'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'

const logout = () => {
  loginStatore.logout()
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  padding-right: 25px;
  background-color: #fff;
  margin-bottom: 10px;

  > div {
    display: flex;
    align-items: center;
  }

  .hamburger-container {
    padding: 0 15px;

    cursor: pointer;
  }

  .el-dropdown-link {
    display: flex;
    align-items: flex-end;

    cursor: pointer;

    .name {
      padding-left: 10px;
      font-size: 18px;
    }
  }
}
</style>
