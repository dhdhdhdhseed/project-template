// 分页
interface PaginationParams {
    pageNumber: number,
    pageSize: number
}
// 表格
interface TableData<T> {
    total: number,
    list: T[]
}
// 弹窗
interface DialogConfig<T> {
    open: boolean,
    data: T,
    title?: string,
    [key: string]: any
}