<template>
  <div class="main">
    <Header />
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="view" mode="out-in" appear>
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './header.vue'
</script>

<style scoped lang="less">
.main {
  height: 100%;
  background-color: #eff1f4;

  .content {
    height: calc(100% - 60px);
    overflow: hidden;
    padding: 40px;
  }

  .view-enter-active {
    animation: enter 0.5s ease-in-out;
  }

  .view-leave-active {
    animation: enter 0.5s ease-in-out reverse;
  }

  @keyframes enter {
    0% {
      opacity: 0;
      transform: skew(0deg, -10deg);
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
