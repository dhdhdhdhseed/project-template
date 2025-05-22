import type { RouteRecordRaw } from 'vue-router'
import isWhiteList from '@/config/white-list'
import { useTitle } from '@/hooks/useTitle'
import { setRouteChange } from '@/mitt/routeListener'
import { useUserStoreHook } from '@/store/modules/user'
import { getToken } from '@/utils/cache/cookies'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import constantRoutes from './constantRoutes'
import 'nprogress/nprogress.css'

const { setTitle } = useTitle()

NProgress.configure({ showSpinner: false })
// 动态路由
export const dynamicRoutes: RouteRecordRaw[] = [
]

const router = createRouter({
  history: import.meta.env.VITE_ROUTER_HISTORY === 'hash'
    ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
    : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes,
})

// #region 路由守卫
router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStore = useUserStoreHook()
  const token = getToken()

  // 如果没有登陆，判断是否在免登录的白名单中，如果存在，则直接进入，否则重定向到登录页面
  if (!token) {
    if (isWhiteList(to)) {
      return next()
    }
    return next('/login')
  }

  // 如果已经登录，并准备进入 Login 页面，则重定向到主页
  if (to.path === '/login') {
    return next({ path: '/' })
  }

  // 如果用户已经登录并获取登录信息
  if (userStore.username) {
    return next()
  }

  // 等待获取用户信息后继续
  try {
    await userStore.getInfo()
    next()
  }
  catch (err: any) {
    // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
    userStore.resetToken()
    ElMessage.error(err.message || '路由守卫过程发生错误')
    next('/login')
  }
})

router.afterEach((to) => {
  setRouteChange(to)
  setTitle(to.meta.title)
  NProgress.done()
})
// endregion

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  }
  catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
