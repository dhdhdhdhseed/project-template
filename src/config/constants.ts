const SYSTEM_NAME = import.meta.env.VITE_APP_TITLE

/** 缓存数据时用到的 Key */
export class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`
  static readonly CONFIG_LAYOUT = `${SYSTEM_NAME}-app-setting-key`
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-key`
  static readonly ACTIVE_THEME_NAME = `${SYSTEM_NAME}-theme-key`
}

/** 侧边栏打开状态常量 */
export const SIDEBAR_OPENED = 'opened'
/** 侧边栏关闭状态常量 */
export const SIDEBAR_CLOSED = 'closed'

export type SidebarOpened = typeof SIDEBAR_OPENED
export type SidebarClosed = typeof SIDEBAR_CLOSED
