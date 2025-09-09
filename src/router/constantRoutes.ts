import type { RouteRecordRaw } from 'vue-router'
/**
 * 常驻路由
 */
const Layouts = () => import('@/layouts/index.vue')
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layouts,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: ':path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true,
    },
    alias: '/:pathMatch(.*)*',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true, // 是否在菜单栏上隐藏
    },
  },
  {
    path: '/',
    component: Layouts,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          elIcon: 'House',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/test',
    component: Layouts,
    redirect: '/test/list',
    name: 'Test',
    meta: {
      title: '测试页面',
      elIcon: 'DocumentCopy',
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/test/dataList.vue'),
        name: 'dataList',
        meta: {
          title: '示例页面',
          keepAlive: true,
        },
      },
      {
        path: 'test',
        component: () => import('@/views/test/test.vue'),
        name: 'test',
        meta: {
          title: '测试页面',
          keepAlive: true,
        },
      },
      {
        path: 'loading',
        component: () => import('@/views/test/loading.vue'),
        name: 'loading',
        meta: {
          title: '首屏加载',
          keepAlive: true,
        },
      },
    ],
  },
]
export default constantRoutes
