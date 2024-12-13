type Status = 1 | 0
function simulateRequest(data: any, status?: Status) {
    return new Promise<any>((resolve, reject) => {
        // 模拟接口响应时间 2s
        setTimeout(() => {
            const requestStatus = status || Math.random()
            // 模拟接口调用成功
            if (requestStatus < 0.8) {
                resolve(data)
            } else {
                // 模拟接口调用出错
                reject(new Error("接口发生错误"))
            }
        }, 2000)
    })
}

// region useFullscreenLoading
/** 模拟接口响应数据 */
const SELECT_RESPONSE_DATA = {
    code: 0,
    data: [
        {
            label: "苹果",
            value: 1
        },
        {
            label: "香蕉",
            value: 2
        },
        {
            label: "橘子",
            value: 3,
            disabled: true
        }
    ],
    message: "获取 Select 数据成功"
}

/** 模拟接口 */
export function getSelectDataApi(params: any) {
    console.log('模拟接口参数', params);
    return simulateRequest(SELECT_RESPONSE_DATA)
}
// endregion

/** 模拟接口响应数据 */
const SUCCESS_RESPONSE_DATA = {
    code: 0,
    data: null,
    message: "操作成功"
}

/** 模拟请求接口成功 */
export function getSuccessApi(params: any) {
    return simulateRequest({ message: '操作成功', data: params })
}

/** 模拟请求接口失败 */
export function getErrorApi(params: any) {
    return simulateRequest(SUCCESS_RESPONSE_DATA, 1)
}
