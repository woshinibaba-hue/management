<template>
  <div class="menu">
    <el-menu
      router
      unique-opened
      :default-active="route.path"
      class="el-menu-vertical-demo"
      :collapse="collapseState.isCollapse"
    >
      <el-menu-item index="/main">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <template v-for="menu in loginState.menu" :key="menu.id">
        <template v-if="menu.type === 1 && menu.url">
          <el-menu-item :index="menu.url">
            <el-icon>
              <component
                :is="iconList[iconList.findIndex((item: any) => item.name === menu.icon)]"
              />
            </el-icon>
            <span>{{ menu.name }}</span>
          </el-menu-item>
        </template>
        <template v-if="menu.type === 1 && !menu.url">
          <el-sub-menu :index="menu.id + ''">
            <template #title>
              <el-icon>
                <component
                  :is="iconList[iconList.findIndex((item: any) => item.name === menu.icon)]"
                />
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="subMenu in menu.children" :key="subMenu.id">
              <template v-if="subMenu.type === 2">
                <el-menu-item-group>
                  <el-menu-item :index="subMenu.url">
                    <span>{{ subMenu.name }}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </template>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router'

import {
  House,
  Link,
  ChatDotRound,
  Monitor,
  Reading,
  MostlyCloudy,
  Odometer,
  Document
} from '@element-plus/icons-vue'

import { useCollapse, useLoginStore } from '@/store'
const collapseState = useCollapse()
const loginState = useLoginStore()
const route = useRoute()
const iconList = [
  Link,
  MostlyCloudy,
  ChatDotRound,
  Monitor,
  Reading,
  Odometer,
  Document
]
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

:deep(.el-menu-item-group__title) {
  padding: 0;
}

.menu {
  height: 100%;

  transition: all 0.3s;
  background-color: #304156;
}
</style>
