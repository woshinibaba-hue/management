import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import { login } from '@/server/login'
import storage from '@/utils/storage'
import router from '@/router'

import * as types from '@/server/login/types'

interface LoginStore {
  user: types.ILoginRes | null
}

export const useLoginStore = defineStore('login', {
  state(): LoginStore {
    return {
      user: null
    }
  },

  actions: {
    async login(data: types.ILogin) {
      const res = await login(data)
      this.user = res.data
      storage.set('userResult', res.data)
      // 跳转至首页
      router.push('/')
      ElMessage.success('登录成功')
    }
  }
})
