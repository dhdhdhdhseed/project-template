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
          svgIcon: 'dashboard',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layouts,
    redirect: '/test',
    name: 'Test',
    meta: {
      title: '测试页面',
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/test/dataList.vue'),
        name: 'dataList',
        meta: {
          title: '数据列表',
        },
      },
      {
        path: 'demo1',
        component: () => import('@/views/test/demo1.vue'),
        name: 'demo1',
        meta: {
          title: 'demo1',
        },
      },
    ],
  },
]
export default constantRoutes
