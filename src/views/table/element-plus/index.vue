<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <SearchBar :formConfig="formConfig" :searchForm="searchForm" @reset="onSearch" @search="onSearch" />
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <!-- 表格操作 -->
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="addUserDialogConfig.open = true">新增用户</el-button>
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="refreshTableData" />
          </el-tooltip>
        </div>
      </div>
      <!-- 表格 -->
      <div class="table-wrapper">
        <el-table :data="tableData.list">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="username" label="用户名" align="center" />
          <el-table-column prop="roles" label="角色" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.roles === 'admin'" type="primary" effect="plain">admin</el-tag>
              <el-tag v-else type="warning" effect="plain">{{ scope.row.roles }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain">启用</el-tag>
              <el-tag v-else type="danger" effect="plain">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pager-wrapper">
        <Pagination ref="paginationRef" @pagination="getTableData" :total="tableData.total" />
      </div>
    </el-card>
    <!-- 新增/修改 弹窗 -->
    <el-dialog v-model="addUserDialogConfig.open" :title="addUserDialogConfig.data.id === undefined ? '新增用户' : '修改用户'"
      @closed="resetUserForm" width="30%">
      <el-form ref="userFormRef" :model="addUserDialogConfig.data" :rules="formRules" label-width="100px"
        label-position="left">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="addUserDialogConfig.data.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password" label="密码" v-if="addUserDialogConfig.data.id === undefined">
          <el-input v-model="addUserDialogConfig.data.password" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addUserDialogConfig.open = false">取消</el-button>
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, nextTick, computed } from "vue"
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getUserListApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData, type UserInfo } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"
import Pagination from "@/components/Pagination/index.vue"
import SearchBar from "@/components/SearchBar/index.vue"

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})

onMounted(() => {
  initsearForm()
  nextTick(() => {
    paginationRef.value.changePage(1)
  })
})

//#region 获取表格数据
const tableData = reactive<TableData<UserInfo>>({
  list: [],
  total: 0
})
const loading = ref<boolean>(false)
const paginationRef = ref()
const getTableData = (page: PaginationParams) => {
  loading.value = true
  const params: any = {
    ...page,
    ...searchParams
  }
  getUserListApi(params)
    .then(({ data }) => {
      tableData.total = data.total
      tableData.list = data.list
    })
    .catch(() => {
      tableData.list = []
      tableData.total = 0
    })
    .finally(() => {
      loading.value = false
    })
}
// 刷新table
const refreshTableData = () => {
  paginationRef.value.refresh()
}
const onSearch = (searchParams: any) => {
  console.log("搜索参数", searchParams)
  paginationRef.value.changePage(1)
}
// #endregion

// #region 搜索栏
const searchParams = computed(() => {
  const params: any = { ...searchForm }
  if (params.time?.length > 0) {
    params.startCreatedTime = params.time[0]
    params.endCreatedTime = params.time[1]
  }
  delete params.time
  return params
})
const searchForm = reactive({})
const formConfig = ref<any>([])
function initsearForm() {
  formConfig.value = [
    {
      type: "input",
      label: "用户名称",
      value: "username",
      placeholder: "请输入用户名称"
    },
    {
      type: "input",
      label: "手机号",
      value: "phone",
      placeholder: "请输入手机号"
    },
    {
      type: "select",
      label: "状态",
      value: "status",
      placeholder: "请选择状态",
      options: [
        { value: "0", label: "禁用" },
        { value: "1", label: "启用" }
      ]
    },
    {
      type: "time",
      label: "创建时间",
      value: "time",
      placeholder: "请选择时间"
    }
  ]
}
// #endregion

// #region 表格操作
const DEFAULT_FORM_DATA: CreateOrUpdateTableRequestData = {
  id: undefined,
  username: "",
  password: ""
}
const userFormRef = ref<FormInstance | null>(null)
const addUserDialogConfig = reactive<DialogConfig<CreateOrUpdateTableRequestData>>({
  open: false,
  data: cloneDeep(DEFAULT_FORM_DATA)
})
const formRules: FormRules<CreateOrUpdateTableRequestData> = {
  username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }]
}
// 用户添加或更新
const handleCreateOrUpdate = () => {
  userFormRef.value?.validate((valid: boolean, fields) => {
    if (!valid) return console.error("表单校验不通过", fields)
    loading.value = true
    const api = addUserDialogConfig.data.id === undefined ? createTableDataApi : updateTableDataApi
    api(addUserDialogConfig.data)
      .then(() => {
        ElMessage.success("操作成功")
        addUserDialogConfig.open = false
        paginationRef.value.changePage(1)
      })
      .catch(() => {
        loading.value = false
      })
  })
}
// 用户删除
const handleDelete = (row: UserInfo) => {
  ElMessageBox.confirm(`正在删除用户：${row.username}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    loading.value = true
    deleteTableDataApi(row.id)
      .then(() => {
        ElMessage.success("删除成功")
        paginationRef.value.changePage(1)
      })
      .catch(() => {
        loading.value = false
      })
  })
}
// 用户修改
const handleUpdate = (row: UserInfo) => {
  addUserDialogConfig.open = true
  addUserDialogConfig.data = cloneDeep(row)
}
// 重置弹窗数据
const resetUserForm = () => {
  userFormRef.value?.clearValidate()
  addUserDialogConfig.data = cloneDeep(DEFAULT_FORM_DATA)
}
// #endregion
</script>
<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
