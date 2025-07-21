<script lang="ts" setup>
import type { UserInfo } from '@/api/interfaces'
import { getUserListApi } from '@/api'
import Pagination from '@/components/Pagination/Pagination.vue'
import SearchBar from '@/components/SearchBar/index.vue'
import { onMounted, reactive, ref } from 'vue'

const DEFAULT_SEARCH_CONFIG = [
  {
    label: '姓名',
    prop: 'name',
    type: 'input',
  },
  {
    label: '性别',
    prop: 'sex',
    type: 'select',
    options: [],
  },
] as const
type SearchFrom = Record<(typeof DEFAULT_SEARCH_CONFIG)[number]['prop'], string>
const searchFrom = reactive<Partial<SearchFrom>>({})
const searchConfig = ref<any>([...DEFAULT_SEARCH_CONFIG])
const loading = ref(false)
const tableData = ref<UserInfo[]>([])
const total = ref<number>(0)
async function getTableData() {
  loading.value = true
  const result = await getUserListApi({
    currentPage: 1,
    size: 10,
    ...searchFrom,
  })
  loading.value = false
  if (result.code === 0) {
    tableData.value = result.data.list
    total.value = result.data.total
  }
}

function handleEdit(_row: UserInfo) {

}
function handleDelete(_row: UserInfo) {

}

onMounted(() => {
  getTableData()
  setTimeout(() => {
    searchConfig.value[1].options = [
      { label: '男', value: '1' },
      { label: '女', value: '2' },
    ]
  }, 5000)
})
</script>

<template>
  <div v-loading="loading" class="page-data-list">
    <div>
      <h3>搜索栏</h3>
      <SearchBar :model-value="searchFrom" :search-config="searchConfig" />
    </div>
    <div>
      <h3>表格</h3>
      <el-table :data="tableData">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="username" label="用户名称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="roles" label="角色">
          <template #default="scoped">
            <el-tag>{{ scoped.row.roles }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作">
          <template #default="scoped">
            <el-button type="primary" size="small" @click="handleEdit(scoped.row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scoped.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <h3>分页</h3>
      <Pagination :total="100" />
    </div>
    <div>
      <h3>全局组件 SVGICON</h3>
      <SvgIcon name="link" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-data-list{
    padding: 20px;
}
</style>
