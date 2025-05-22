import { useSettingsStore } from '@/store'
import { computed } from 'vue'

const settingsStore = useSettingsStore()
const isLeft = computed(() => settingsStore.layoutMode === 'left')
const isTop = computed(() => settingsStore.layoutMode === 'top')
const isLeftTop = computed(() => settingsStore.layoutMode === 'left-top')

function setLayoutMode(mode: LayoutModeType) {
  settingsStore.layoutMode = mode
}

export function useLayoutMode() {
  return { isLeft, isTop, isLeftTop, setLayoutMode }
}
