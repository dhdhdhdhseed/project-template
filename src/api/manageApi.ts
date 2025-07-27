import type * as Interfaces from './interfaces'
import { request } from '@/utils/service'

/** 增 */
export function createTableDataApi(data: Interfaces.CreateOrUpdateTableRequestData) {
  return request({
    url: 'table',
    method: 'post',
    data,
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: 'delete',
  })
}

/** 改 */
export function updateTableDataApi(data: Interfaces.CreateOrUpdateTableRequestData) {
  return request({
    url: 'table',
    method: 'put',
    data,
  })
}

// 获取用户列表
export function getUserListApi(params: Interfaces.UserListeRequestData) {
  if (Math.random() < 0.5) {
    return new Promise<any>((resolve) => {
      // 模拟loading接口响应时间 2s
      setTimeout(() => {
        resolve(request<Interfaces.UserListResponseData>({
          url: 'table',
          method: 'get',
          params,
        }))
      }, 2000)
    })
  }
  else {
    return request<Interfaces.UserListResponseData>({
      url: 'table',
      method: 'get',
      params,
    })
  }
}

// 模拟接口响应时间 2s
export function simulatingRequests(time: number = 2000) {
  return new Promise<any>((resolve) => {
    // 模拟loading接口响应时间 2s
    setTimeout(() => {
      resolve(request<Interfaces.UserListResponseData>({
        url: 'users/info',
        method: 'get',
      }))
    }, time)
  })
}
