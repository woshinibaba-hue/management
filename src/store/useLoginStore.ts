import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import { login } from '@/server/login'
import { getUserMenu } from '@/server/menu'

import storage from '@/utils/storage'
import { mapRouter, initRouter } from '@/utils/map_router'

import router from '@/router'

import * as types from '@/server/login/types'
import * as menuTypes from '@/server/menu/type'

interface LoginStore {
  user: types.ILoginRes | null
  menu: menuTypes.IMenu[]
}

export const useLoginStore = defineStore('login', {
  state(): LoginStore {
    return {
      user: null,
      menu: []
    }
  },

  actions: {
    async login(data: types.ILogin) {
      const res = await login(data)
      this.user = res.data

      storage.set('userResult', res.data)

      // 登录成功获取当前用户菜单
      this.getMenuAction()

      ElMessage.success('登录成功')
    },

    async getMenuAction() {
      const menuList = storage.get('menu_list')

      let menu = menuList

      if (!menuList) {
        const res = await getUserMenu()
        menu = res.data.menuList
        this.menu = menu
        storage.set('menu_list', menu)
      }
      const routes = mapRouter(menu)
      routes.forEach((route) => router.addRoute('layout', route))

      router.push({ name: initRouter?.name })
    },

    initAction() {
      const userResult = storage.get('userResult')
      const menuList = storage.get('menu_list')
      if (!userResult) return
      this.user = userResult
      this.menu = menuList
      this.getMenuAction()
    },

    logout() {
      this.user = null
      this.menu = []
      storage.remove('userResult')
      storage.remove('menu_list')

      router.replace('/login')
    }
  }
})
