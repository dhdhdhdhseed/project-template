import type { RouteRecordRaw } from 'vue-router'
import { simulatingRequests } from '@/api'
import isWhiteList from '@/config/white-list'
import { useTitle } from '@/hooks/useTitle'
import { setRouteChange } from '@/mitt/routeListener'
import { useUserStoreHook } from '@/store'
import { getToken } from '@/utils/cache/cookies'
import { loadingMessage } from '@/utils/loadingMessage'
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

  // 如果已经存在网站基础数据则直接进入
  // if (true) {
  //   return next()
  // }

  // 等待网站基础数据后继续
  let loading: any = null
  try {
    loading = loadingMessage('正在处理...')
    await simulatingRequests(2000)
    loading.close()
    ElMessage.success('网站基础数据加载完成，开始跳转')
    next()
  }
  catch (err: any) {
    loading.close()
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
// #endregion
export default router
