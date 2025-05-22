import { useAppStore } from '@/store'
import { computed } from 'vue'

const appStore = useAppStore()
const isMobile = computed(() => appStore.device === 'mobile')
const isDesktop = computed(() => appStore.device === 'desktop')

export function useDevice() {
  return { isMobile, isDesktop }
}
