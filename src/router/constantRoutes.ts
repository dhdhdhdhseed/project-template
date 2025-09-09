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
    ],
  },
  {
    path: '/list1',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list1',
    meta: {
      title: '示例页面1',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list2',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list2',
    meta: {
      title: '示例页面2',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list3',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list3',
    meta: {
      title: '示例页面3',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list4',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list4',
    meta: {
      title: '示例页面4',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list5',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list5',
    meta: {
      title: '示例页面5',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list6',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list6',
    meta: {
      title: '示例页面6',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list7',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list7',
    meta: {
      title: '示例页面7',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list8',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list8',
    meta: {
      title: '示例页面8',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list9',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list9',
    meta: {
      title: '示例页面9',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list10',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list10',
    meta: {
      title: '示例页面10',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list11',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list11',
    meta: {
      title: '示例页面11',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list12',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list12',
    meta: {
      title: '示例页面12',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
  {
    path: '/list13',
    component: () => import('@/views/test/dataList.vue'),
    name: 'list13',
    meta: {
      title: '示例页面13',
      keepAlive: true,
      elIcon: 'DocumentCopy',
    },
  },
]
export default constantRoutes
