import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import { login } from '@/server/login'
import { getUserMenu } from '@/server/menu'

import storage from '@/utils/storage'
import { mapRouter } from '@/utils/map_router'

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

      // const menus = await getUserMenu()

      // storage.set('menu_list', menus.data.menuList)

      // const routes = mapRouter(menus.data.menuList)

      // 登录成功获取当前用户菜单
      this.getMenuAction()
      // router.push('/')

      // routes.forEach((item) => router.addRoute(item))

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

      router.push('/')
    },

    initAction() {
      const userResult = storage.get('userResult')
      const menuList = storage.get('menu_list')
      if (!userResult) return
      this.user = userResult
      this.menu = menuList
      this.getMenuAction()
    }
  }
})
