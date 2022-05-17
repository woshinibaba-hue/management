<template>
  <div class="menu">
    <el-menu
      router
      unique-opened
      :default-active="route.path"
      class="el-menu-vertical-demo"
      :collapse="collapseState.isCollapse"
    >
      <template v-for="menu in loginState.menu" :key="menu.id">
        <template v-if="menu.type === 1">
          <el-sub-menu :index="menu.id + ''">
            <template #title>
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
import { useRoute } from 'vue-router'
import { useCollapse, useLoginStore } from '@/store'
const collapseState = useCollapse()
const loginState = useLoginStore()

const route = useRoute()
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
