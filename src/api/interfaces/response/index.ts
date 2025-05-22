// region 用户相关
export interface CreateOrUpdateTableRequestData {
  id?: string
  username: string
  password?: string
}
export interface UserListeRequestData {
  currentPage: number
  size: number
  username?: string // 用户名称
  phone?: string // 手机号
}
export interface UserInfo {
  createTime: string
  email: string
  id: string
  phone: string
  roles: string
  status: boolean
  username: string
}
export type UserListResponseData = ApiResponseData<{
  list: UserInfo[]
  total: number
}>

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string, roles: string[] }>
// endregion
