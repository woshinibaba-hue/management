// 根据用户菜单动态生成路由映射关系
import { IMenu } from '@/server/menu/type'
import { RouteRecordRaw } from 'vue-router'

export function mapRouter(userMenu: IMenu[]) {
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
        router && routers.push(router)
      } else {
        // 如果不是菜单，则递归获取子菜单
        _recurRoute(route.children)
      }
    }
  }

  _recurRoute(userMenu)

  return routers
}
