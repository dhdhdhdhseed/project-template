export interface CreateOrUpdateTableRequestData {
  id?: string
  username: string
  password?: string
}

// region getUserListApi
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
// endregion
