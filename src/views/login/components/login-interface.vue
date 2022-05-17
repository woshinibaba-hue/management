<template>
  <div class="login-interface">
    <p class="title">登录</p>
    <el-form
      ref="ruleFormRef"
      label-width="80px"
      :rules="rules"
      :model="formData"
      label-position="top"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="remember" label="记住密码" size="large" />
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'

import { useLoginStore } from '@/store/useLoginStore'
import storage from '@/utils/storage'

import { ILogin } from './types'

// 获取本地存储当中的用户信息
const user = storage.get<ILogin>('user')

const ruleFormRef = ref<FormInstance>()

const formData = reactive({
  email: '',
  password: ''
})

if (user) {
  formData.email = user.email
  formData.password = user.password
}

const remember = ref(true)

const loginStore = useLoginStore()

// 表单校验规则
const rules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 重置表单数据
const reset = () => {
  ruleFormRef.value?.resetFields()
}

const login = () => {
  ruleFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loginStore.login(formData)

      // 判断当前用户是否勾选了记住密码
      if (remember.value) {
        storage.set('user', formData)
      } else {
        storage.remove('user')
      }
    }
  })
}
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
