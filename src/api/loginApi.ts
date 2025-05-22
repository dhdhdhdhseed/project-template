import type * as Interfaces from './interfaces'
import { request } from '@/utils/service'

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request<Interfaces.LoginCodeResponseData>({
    url: 'login/code',
    method: 'get',
  })
}

/** 登录并返回 Token */
export function loginApi(data: Interfaces.LoginRequestData) {
  return request<Interfaces.LoginResponseData>({
    url: 'users/login',
    method: 'post',
    data,
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Interfaces.UserInfoResponseData>({
    url: 'users/info',
    method: 'get',
  })
}
