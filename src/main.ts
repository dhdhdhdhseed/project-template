import App from '@/App.vue'
// load
import { loadSvg } from '@/icons'
import { loadPlugins } from '@/plugins'
import router from '@/router'
import store from '@/store'
// core
import { createApp } from 'vue'
// css
import 'normalize.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.css'

const app = createApp(App)
/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
app.use(store).use(router)
router.isReady().then(() => {
  app.mount('#app')
})
