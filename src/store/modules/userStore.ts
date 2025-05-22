import type { LoginRequestData } from '@/api/interfaces'
import { getUserInfoApi, loginApi } from '@/api'
import store, { useSettingsStore, useTagsViewStore } from '@/store'
import { getToken, removeToken, setToken } from '@/utils/cache/cookies'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const token = ref<string>(getToken() || '')
  const roles = ref<string[]>([])
  const username = ref<string>('')

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 登录 */
  const login = async ({ username, password, code }: LoginRequestData) => {
    const { data } = await loginApi({ username, password, code })
    setToken(data.token)
    token.value = data.token
  }
  /** 获取用户详情 */
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    username.value = data.username
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.roles?.length > 0 ? data.roles : ['DEFAULT_ROLE']
  }

  /** 重置 Visited Views 和 Cached Views */
  const resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ''
    roles.value = []
    resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }
  return { token, roles, username, login, getInfo, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
