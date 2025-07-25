<script lang="ts" setup>
import { useAppStore, useSettingsStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { AppMain, NavigationBar, Sidebar, TagsView } from './components'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { showTagsView, fixedHeader } = storeToRefs(settingsStore)

/** 定义计算属性 layoutClasses，用于控制布局的类名 */
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.isMobile,
  }
})

/** 用于处理点击 mobile 端侧边栏遮罩层的事件 */
function handleClickOutside() {
  appStore.closeSidebar(false)
}
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- mobile 端侧边栏遮罩层 -->
    <div
      v-if="layoutClasses.mobile && layoutClasses.openSidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 左侧边栏 -->
    <Sidebar class="sidebar-container" />
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 头部导航栏和标签栏 -->
      <div :class="{ 'fixed-header': fixedHeader }" class="layout-header">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$transition-time: 0.35s;

.app-wrapper {
  position: relative;
  width: 100%;
}

.drawer-bg {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  transition: width $transition-time;
  width: var(--app-sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: var(--app-sidebar-border-right);
}

.main-container {
  min-height: 100%;
  transition: margin-left $transition-time;
  margin-left: var(--app-sidebar-width);
  position: relative;

  .app-main {
    min-height: calc(100vh - var(--app-nav-height));
    position: relative;
    overflow: hidden;
  }

  .layout-header {
    position: relative;
    z-index: 9;
    background-color: var(--app-bg-color);
    box-shadow: var(--app-box-shadow-lighter);
    border-bottom: var(--app-header-border-bottom);
    background-color: var(--el-bg-color);
  }
  // 顶部固定模式 header浮动 app-main 预留header高度
  .fixed-header {
    position: fixed !important;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - var(--app-sidebar-width));
    transition: width $transition-time;
  }
  .fixed-header + .app-main {
    padding-top: var(--app-nav-height);
    height: 100vh;
    overflow: auto;
  }
}
// 显示标签栏时，app-main 的高度需要减去 header 的高度
.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--app-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--app-header-height);
  }
}

.hideSidebar {
  .sidebar-container {
    width: var(--app-sidebar-hide-width) !important;
  }
  .main-container {
    margin-left: var(--app-sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--app-sidebar-hide-width));
  }
}

// 适配 mobile 端
.mobile {
  .sidebar-container {
    transition: transform $transition-time;
    width: var(--app-sidebar-width) !important;
  }
  .main-container {
    margin-left: 0px;
  }
  .fixed-header {
    width: 100%;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--app-sidebar-width)), 0, 0);
    }
  }
}

.withoutAnimation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}
</style>
