import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

export default pinia

// 统一导出
export * from './modules/app'
export * from './modules/settings'
export * from './modules/tags-view'
export * from './modules/user'
