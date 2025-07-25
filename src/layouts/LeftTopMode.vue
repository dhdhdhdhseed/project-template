<script lang="ts" setup>
import { useAppStore, useSettingsStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { AppMain, Logo, NavigationBar, Sidebar, TagsView } from './components'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { showTagsView, showLogo } = storeToRefs(settingsStore)

/** 定义计算属性 layoutClasses，用于控制布局的类名 */
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
  }
})
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="fixed-header layout-header">
      <Logo v-if="showLogo" :collapse="false" class="logo" />
      <div class="content">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
    </div>
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 左侧边栏 -->
      <Sidebar class="sidebar-container" />
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$transition-time: 0.35s;

.app-wrapper {
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  display: flex;
  .logo {
    width: var(--app-sidebar-width);
  }
  .content {
    flex: 1;
    position: relative;
  }
}

.layout-header {
  background-color: var(--app-header-bg-color);
  box-shadow: var(--app-box-shadow-lighter);
  border-bottom: var(--app-header-border-bottom);
}

.main-container {
  min-height: 100%;
}

.sidebar-container {
  transition: width $transition-time;
  width: var(--app-sidebar-width) !important;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: var(--app-sidebar-border-right);
  padding-top: var(--app-nav-height);
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--app-nav-height);
  padding-left: var(--app-sidebar-width);
  height: 100vh;
  overflow: auto;
}

.hideSidebar {
  .sidebar-container {
    width: var(--app-sidebar-hide-width) !important;
  }
  .app-main {
    padding-left: var(--app-sidebar-hide-width);
  }
}

.hasTagsView {
  .sidebar-container {
    padding-top: var(--app-header-height);
  }
  .app-main {
    padding-top: var(--app-header-height);
  }
}
</style>
