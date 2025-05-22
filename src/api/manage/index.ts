import type * as Table from './types/table'
import { request } from '@/utils/service'

/** 增 */
export function createTableDataApi(data: Table.CreateOrUpdateTableRequestData) {
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
export function updateTableDataApi(data: Table.CreateOrUpdateTableRequestData) {
  return request({
    url: 'table',
    method: 'put',
    data,
  })
}

// 获取用户列表
export function getUserListApi(params: Table.UserListeRequestData) {
  if (Math.random() < 0.5) {
    return new Promise<any>((resolve) => {
      // 模拟loading接口响应时间 2s
      setTimeout(() => {
        resolve(request<Table.UserListResponseData>({
          url: 'table',
          method: 'get',
          params,
        }))
      }, 2000)
    })
  }
  else {
    return request<Table.UserListResponseData>({
      url: 'table',
      method: 'get',
      params,
    })
  }
}
