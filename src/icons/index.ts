import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue' // Svg Component
// @ts-expect-error virtual module is handled by vite-plugin-svg-icons
import 'virtual:svg-icons-register'

export function loadSvg(app: App) {
  app.component('SvgIcon', SvgIcon)
}
