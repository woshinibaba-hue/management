<template>
  <div class="login">
    <LoginInterface class="interface" />
  </div>
</template>

<script setup lang="ts">
import { LoginInterface } from './components'
</script>

<style lang="less" scoped>
.login {
  position: relative;

  width: 100%;
  height: 100%;

  overflow: hidden;

  background: url(~@/assets/images/login-bg.jpg) no-repeat center;
  background-size: cover;

  &::after {
    content: '';

    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(15px);
  }

  .interface {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
