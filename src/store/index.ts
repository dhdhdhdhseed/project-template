import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 使用持久化存储插件 (需要在setup外访问的store不适用持久化存储插件，请使用 localStorage)
pinia.use(persist)

export default pinia

// 统一导出
export * from './modules/appStore'
export * from './modules/settingsStore'
export * from './modules/tagsViewStore'
export * from './modules/userStore'
