<template>
  <div class="main">
    <el-tabs tab-position="left" style="height: 200px" class="demo-tabs">
      <el-tab-pane label="个人信息">
        <Profile />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import Profile from './profile/profile.vue'
</script>

<style scoped lang="less">
.main {
  border-radius: 10px;
  padding: 20px 0;
  background-color: #fff;
}

:deep(.el-tabs) {
  height: unset !important;
}

:deep(.el-tabs__header) {
  width: 210px;
  margin-right: 30px !important;
  text-align: left !important;
}

:deep(.el-tabs__item) {
  text-align: left !important;
  background-color: #e6f7ff;
}

:deep(.is-active) {
  font-weight: 700;
}

:deep(.el-tabs__content),
:deep(.el-tab-pane) {
  height: 100%;
}
</style>
