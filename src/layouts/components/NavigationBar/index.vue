<script lang="ts" setup>
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import { useAppStore, useSettingsStore, useUserStore } from '@/store'
import { UserFilled } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Breadcrumb from '../Breadcrumb/index.vue'
import Hamburger from '../Hamburger/index.vue'
import Sidebar from '../Sidebar/index.vue'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { showThemeSwitch, isTop } = storeToRefs(settingsStore)

/** 切换侧边栏 */
function toggleSidebar() {
  appStore.toggleSidebar(false)
}

/** 登出 */
function logout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="layout-navigation-bar">
    <!-- 折叠按钮 -->
    <Hamburger
      v-if="!isTop || appStore.isMobile"
      :is-active="appStore.sidebar.opened"
      class="hamburger"
      @toggle-click="toggleSidebar"
    />
    <!-- 面包屑 -->
    <Breadcrumb v-if="!isTop || appStore.isMobile" class="breadcrumb" />
    <!-- 顶部模式 - 侧边栏 -->
    <Sidebar v-if="isTop && !appStore.isMobile" class="sidebar" />
    <div class="right-menu">
      <!-- 主题切换按钮 -->
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <!-- 用户信息 -->
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" />
          <span>{{ userStore.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-navigation-bar {
  height: var(--app-nav-height);
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    flex: 1;
    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .sidebar {
    flex: 1;
    min-width: 0; // 允许收缩
  }
  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
