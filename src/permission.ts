import router from '@/router'

import storage from '@/utils/storage'

import { ILoginRes } from '@/server/login/types'

// 白名单页面，不需要token就能访问的页面
const writeList = ['/login', '/404']

router.beforeEach((to) => {
  // 获取当前用户信息
  const user = storage.get<ILoginRes>('userResult')

  // 判断用户token是否存在，如果存在，并且访问登录页，则直接跳转至首页
  if (user && user.token) {
    if (to.path === '/login') {
      return '/'
    }
  } else {
    // 用户没有登录，跳转至登录页
    if (writeList.includes(to.path)) {
      return true
    } else {
      return '/login'
    }
  }
})
