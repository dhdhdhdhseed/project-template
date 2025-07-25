<script lang="ts" setup>
import constantRoutes from '@/router/constantRoutes'
import { useAppStore, useSettingsStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Logo from '../Logo/index.vue'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { isLeft, isTop } = storeToRefs(settingsStore)

const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path,
  } = route
  return activeMenu || path
})
const noHiddenRoutes = computed(() =>
  constantRoutes.filter(item => !item.meta?.hidden),
)

const isCollapse = computed(() => !appStore.sidebar.opened)
const isLogo = computed(() => isLeft.value && settingsStore.showLogo)
const sidebarMenuItemHeight = computed(() => {
  return !isTop.value
    ? 'var(--app-sidebar-menu-item-height)'
    : 'var(--app-nav-height)'
})
const sidebarMenuHoverBgColor = computed(() => {
  return !isTop.value
    ? 'var(--app-sidebar-menu-hover-bg-color)'
    : 'transparent'
})
const tipLineWidth = computed(() => {
  return !isTop.value ? '2px' : '0px'
})
// 当为顶部模式时隐藏垂直滚动条
const hiddenScrollbarVerticalBar = computed(() => {
  return isTop.value ? 'none' : 'block'
})
</script>

<template>
  <div :class="{ 'has-logo': isLogo }">
    <Logo v-if="isLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse && !isTop"
        :unique-opened="true"
        :collapse-transition="false"
        :mode="isTop && !appStore.isMobile ? 'horizontal' : 'vertical'"
      >
        <SidebarItem
          v-for="routeItem in noHiddenRoutes"
          :key="routeItem.path"
          :item="routeItem"
          :base-path="routeItem.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
%tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(tipLineWidth);
    height: 100%;
    background-color: var(--app-sidebar-menu-tip-line-bg-color);
  }
}

.el-scrollbar {
  height: 100%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      min-height: 100%;
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
    &.is-vertical {
      // 当为顶部模式时隐藏垂直滚动条
      display: v-bind(hiddenScrollbarVerticalBar);
    }
  }
}
// 显示 Logo，el-scrollbar 减去 Logo 高度
.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--app-header-height));
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

.el-menu--horizontal {
  height: v-bind(sidebarMenuItemHeight);
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: v-bind(sidebarMenuItemHeight);
  line-height: v-bind(sidebarMenuItemHeight);
  &.is-active,
  &:hover {
    background-color: v-bind(sidebarMenuHoverBgColor);
  }
}

:deep(.el-menu-item.is-active) {
  @extend %tip-line;
}

.el-menu--collapse {
  :deep(.el-sub-menu.is-active) {
    .el-sub-menu__title {
      @extend %tip-line;
    }
  }
}
</style>
