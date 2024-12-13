import { ref, onMounted } from "vue"

type OptionValue = string | number

/** Select 需要的数据格式 */
interface SelectOption {
  value: OptionValue
  label: string
  disabled?: boolean
}

/** 接口响应格式 */
type ApiData = ApiResponseData<SelectOption[]>

/** 入参格式
 * api 数据接口
 * params 接口参数
 */
interface FetchSelectProps {
  api: (params: any) => Promise<ApiData>,
  params: any
}

export function useFetchSelect(props: FetchSelectProps) {
  const { api, params } = props

  const loading = ref<boolean>(false)
  const options = ref<SelectOption[]>([])
  const value = ref<OptionValue>("")

  /** 调用接口获取数据 */
  const loadData = () => {
    loading.value = true
    options.value = []
    api(params)
      .then((res) => {
        options.value = res.data
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(() => {
    loadData()
  })

  return {
    loading,
    options,
    value
  }
}
