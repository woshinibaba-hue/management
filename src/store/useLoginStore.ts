import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import { login } from '@/server/login'
import { getUserMenu } from '@/server/menu'
import { getRoleList } from '@/server/role'

import storage from '@/utils/storage'
import {
  mapRouter,
  initRouter,
  mapMenusToPermissions
} from '@/utils/map_router'

import router from '@/router'

import * as types from '@/server/login/types'
import * as menuTypes from '@/server/menu/type'
import * as roleTypes from '@/server/role/type'

interface LoginStore {
  user: types.ILoginRes | null
  menu: menuTypes.IMenu[]
  permissions: string[]
  roles: roleTypes.IRole[]
}

const initRouters = ['login', 'layout', 'not-found', 'main']

export const useLoginStore = defineStore('login', {
  state(): LoginStore {
    return {
      user: null,
      menu: [],
      permissions: [],
      roles: []
    }
  },

  actions: {
    async login(data: types.ILogin) {
      const res = await login(data)
      this.user = res.data

      storage.set('userResult', res.data)

      // 登录成功获取当前用户菜单
      this.getMenuAction()

      if (res.data.auto === 1 || res.data.auto === 2) {
        // 获取角色列表
        this.getRoleList()
      }

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

      // 先删除所有的动态注册的路由
      router.getRoutes().forEach((item) => {
        if (item.name) {
          !initRouters.includes(<string>item.name) &&
            router.removeRoute(item.name)
        }
      })

      routes.forEach((route) => router.addRoute('layout', route))

      // 获取当前用户的所有按钮权限
      const permissions = mapMenusToPermissions(menu)

      this.permissions = permissions

      router.push({ name: initRouter?.name })
    },

    // 获取角色列表
    async getRoleList(params: roleTypes.IRoleParams = {}) {
      const roles = await getRoleList(params)
      this.roles = roles.data
      storage.set('role_list', roles.data)
    },

    // 初始化基础数据
    initAction() {
      const userResult = storage.get('userResult')
      const menuList = storage.get('menu_list')
      const roleList = storage.get('role_list')
      if (!userResult) return
      this.user = userResult
      this.menu = menuList
      this.roles = roleList
      this.getMenuAction()
    },

    // 退出登录
    logout() {
      this.user = null
      this.menu = []
      this.roles = []
      storage.remove('userResult')
      storage.remove('menu_list')
      storage.remove('role_list')

      router.replace('/login')
    }
  }
})
