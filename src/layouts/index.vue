<script lang="ts" setup>
import { useAppStore, useSettingsStore } from '@/store'
import { getCssVariableValue, setCssVariableValue } from '@/utils'
import { storeToRefs } from 'pinia'
import { computed, watchEffect } from 'vue'
import { RightPanel, Settings } from './components'
import useResize from './hooks/useResize'
import LeftMode from './LeftMode.vue'
import LeftTopMode from './LeftTopMode.vue'
import TopMode from './TopMode.vue'

/** Layout 布局响应式 */
useResize()

const settingsStore = useSettingsStore()
const appStore = useAppStore()
const { showSettings, showTagsView, showGreyMode, showColorWeakness, isLeft, isTop, isLeftTop } = storeToRefs(settingsStore)

const classes = computed(() => {
  return {
    showGreyMode: showGreyMode.value,
    showColorWeakness: showColorWeakness.value,
  }
})

// #region 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVariableName = '--v3-tagsview-height'
const v3TagsviewHeight = getCssVariableValue(cssVariableName)
watchEffect(() => {
  showTagsView.value
    ? setCssVariableValue(cssVariableName, v3TagsviewHeight)
    : setCssVariableValue(cssVariableName, '0px')
})
// #endregion
</script>

<template>
  <div :class="classes">
    <!-- 左侧模式 -->
    <LeftMode v-if="isLeft || appStore.isMobile" />
    <!-- 顶部模式 -->
    <TopMode v-else-if="isTop" />
    <!-- 混合模式 -->
    <LeftTopMode v-else-if="isLeftTop" />
    <!-- 右侧设置面板 -->
    <RightPanel v-if="showSettings">
      <Settings />
    </RightPanel>
  </div>
</template>

<style lang="scss" scoped>
.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}
</style>
