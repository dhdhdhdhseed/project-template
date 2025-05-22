<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme'
import { useAppStore } from '@/store'
// 将 Element Plus 的语言设置为中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const appStore = useAppStore()
const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
  <div style="padding:0 400px">
    {{ appStore }}
  </div>
</template>
