const SYSTEM_NAME = import.meta.env.VITE_APP_TITLE

/** 缓存数据时用到的 Key */
export class CacheKey {
  static readonly TOKEN = `token-cache`
  static readonly CONFIG_LAYOUT = `app-setting-cache`
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-key`
  static readonly ACTIVE_THEME_NAME = `${SYSTEM_NAME}-theme-key`
  static readonly APP_CACHE = `app-cache`
}

/** 侧边栏打开状态常量 */
export const SIDEBAR_OPENED = 'opened'
/** 侧边栏关闭状态常量 */
export const SIDEBAR_CLOSED = 'closed'

export type SidebarOpened = typeof SIDEBAR_OPENED
export type SidebarClosed = typeof SIDEBAR_CLOSED
