<script lang="ts" setup>
import logoText2 from '@/assets/layouts/logo-text-1.png'
import logo from '@/assets/layouts/logo.png'
import { useSettingsStore } from '@/store'
import { storeToRefs } from 'pinia'

interface Props {
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapse: true,
})
const settingsStore = useSettingsStore()
const { isTop } = storeToRefs(settingsStore)
</script>

<template>
  <div class="layout-logo-container" :class="{ 'collapse': props.collapse, 'layout-mode-top': isTop }">
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img :src="logo" class="layout-logo">
      </router-link>
      <router-link v-else key="expand" to="/">
        <img :src="logoText2" class="layout-logo-text">
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.layout-logo-container {
  width: 100%;
  height: var(--app-header-height);
  line-height: var(--app-header-height);
  text-align: center;
  overflow: hidden;
  background-color: var(--app-theme-color);
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 100%;
    vertical-align: middle;
  }
}

.layout-mode-top {
  height: var(--app-nav-height);
  line-height: var(--app-nav-height);
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
