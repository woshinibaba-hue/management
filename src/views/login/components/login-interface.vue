<template>
  <div class="login-interface">
    <p class="title">登录</p>
    <el-form ref="ruleFormRef" label-width="80px" label-position="top">
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" clearable />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="formData.password"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox label="记住密码" size="large" />
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary">登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
const ruleFormRef = ref<FormInstance>()

const formData = reactive({
  email: '',
  password: ''
})
</script>

<style scoped lang="less">
.login-interface {
  width: 400px;
  height: 350px;

  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);

  .title {
    color: rgba(0, 0, 0, 0.6);
    font-size: 26px;
    text-align: center;
    margin-bottom: 18px;
  }

  .btns {
    width: 100%;
    margin-top: 20px;

    :deep(.el-form-item__content) {
      justify-content: center;
    }
  }
}
</style>
