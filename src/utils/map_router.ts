// 根据用户菜单动态生成路由映射关系
import { IMenu } from '@/server/menu/type'
import { RouteRecordRaw } from 'vue-router'

let initRouter: RouteRecordRaw | null = null

// 获取需要注册的路由
export function mapRouter(userMenu: IMenu[]) {
  initRouter = null
  // 1. 需要注册的路由
  const routers: RouteRecordRaw[] = []

  // 2. 所有的路由信息
  const allRouter: RouteRecordRaw[] = []

  // 使用 require.context 查找所有路由表信息
  // 参数1：需要查找的路径
  // 参数2：是否进行递归查找
  // 参数3：正则表达式(需要匹配的文件)
  const pathRouters = require.context('../router/main', true, /\.ts$/)
  const keys = pathRouters.keys()

  for (const key of keys) {
    // 取出路由表信息
    const routeModel = require(`../router/main${key.split('.')[1]}`)
    // 将路由表信息添加到所有路由表中
    allRouter.push(routeModel.default)
  }

  // 3. 从当前用户菜单中获取当前用户的路由表信息
  const _recurRoute = (menu: IMenu[]) => {
    for (const route of menu) {
      if (route.type === 2) {
        // 将路由信息添加到 routers 中
        const router = allRouter.find((item) => item.path === route.url)
        if (router) {
          if (!initRouter) initRouter = router
          routers.push(router)
        }
      } else {
        // 如果不是菜单，则递归获取子菜单
        _recurRoute(route.children)
      }
    }
  }

  _recurRoute(userMenu)

  return routers
}

// 获取按钮权限
export function mapMenusToPermissions(userMenu: IMenu[]) {
  const permissions: string[] = []

  const _recurPermission = (menu: IMenu[]) => {
    for (const item of menu) {
      if (item.type !== 3) {
        // 如果不是3表示还存在子级菜单，递归遍历
        _recurPermission(item.children ?? [])
      } else {
        // 当type为3表示为按钮权限
        item.permission && permissions.push(item.permission)
      }
    }
  }

  _recurPermission(userMenu)

  return permissions
}

// 当前需要勾选的节点
export function mapMenusToChecked(userMenu: IMenu[]) {
  const checkeds: number[] = []

  const _recurChecked = (menu: IMenu[]) => {
    for (const item of menu) {
      if (item.children) {
        _recurChecked(item.children ?? [])
      } else {
        checkeds.push(item.id)
      }
    }
  }

  _recurChecked(userMenu)

  return checkeds
}

export { initRouter }
