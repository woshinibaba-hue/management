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
    height: calc(100% - 60px - 10px);
    overflow: hidden;
    padding: 40px;
    background-color: #fff;
    overflow-y: auto;
  }

  .view-enter-active {
    animation: enter 0.3s ease-in-out;
  }

  .view-leave-active {
    animation: leave 0.3s ease-in-out;
  }

  @keyframes enter {
    0% {
      opacity: 0;
      transform: translateX(-300px);
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes leave {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      transform: translateX(300px);
    }
  }
}
</style>
