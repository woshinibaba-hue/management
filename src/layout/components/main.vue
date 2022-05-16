<template>
  <div class="main">
    <Header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from './header.vue'
</script>

<style scoped lang="less">
.main {
  height: 100%;

  background-color: #eff1f4;
}
</style>
