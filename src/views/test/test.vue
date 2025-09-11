<script lang="ts" setup>
import { getUserListApi } from '@/api/manageApi'
import Pagination from '@/components/Pagination/Pagination.vue'
import { Iphone, Message } from '@element-plus/icons-vue'
import { ElButton, ElCard, ElIcon, ElTag } from 'element-plus'
import { h, onMounted, ref } from 'vue'

const pagination = ref()
const columns = [
  {
    key: 'id',
    dataKey: 'id',
    title: 'ID',
    width: 400,
  },
  {
    key: 'username',
    dataKey: 'username',
    title: '用户名',
    width: 400,
  },
  {
    key: 'email',
    dataKey: 'email',
    title: '邮箱',
    width: 400,
    headerCellRenderer: ({ column }: any) => [
      h(ElIcon, {}, { default: () => h(Message) }),
      h('span', { style: 'margin-left: 3px;' }, column.title),
    ],
  },
  {
    key: 'phone',
    dataKey: 'phone',
    title: '手机号',
    width: 400,
    headerCellRenderer: ({ column }: any) => [
      h(ElIcon, {}, { default: () => h(Iphone) }),
      h('span', { style: 'margin-left: 3px;' }, column.title),
    ],
  },
  {
    key: 'roles',
    dataKey: 'roles',
    title: '角色',
    width: 400,
    cellRenderer: ({ cellData }: any) => h(ElTag, {}, () => cellData),
  },
  {
    key: 'createTime',
    dataKey: 'createTime',
    title: '创建时间',
    width: 400,
  },
  {
    key: 'action',
    dataKey: 'action',
    title: '操作',
    width: 400,
    cellRenderer: ({ rowData }: any) => [
      h(ElButton, { link: true, type: 'primary', onClick: () => {
        console.error('查看', rowData)
      } }, () => '查看'),
      h(ElButton, { link: true, type: 'primary', onClick: () => {
        console.error('编辑', rowData)
      } }, () => '编辑'),
      h(ElButton, { link: true, type: 'danger', onClick: () => {
        console.error('删除', rowData)
      } }, () => '删除'),
    ],
  },
]
const tableData = ref([])
const loading = ref(false)
async function getTableData(page: any) {
  // 模拟请求
  loading.value = true
  const result = await getUserListApi(page)
  loading.value = false
  if (result.code === 0) {
    tableData.value = result.data.list
  }
}

onMounted(() => {
  pagination.value.changePage(1)
})
</script>

<template>
  <div class="test-page">
    <ElCard>
      <div v-loading="loading" style="height: 700px">
        <el-auto-resizer>
          <template #default="{ height, width }">
            <el-table-v2
              :columns="columns"
              :data="tableData"
              :width="width"
              :height="height"
            />
          </template>
        </el-auto-resizer>
      </div>
      <div style="margin-top: 20px;">
        <Pagination ref="pagination" :total="100" :page-size="100" :sizes="[100, 500, 1000, 2000]" @pagination="getTableData" />
      </div>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
.test-page {
  padding: 20px;
  .el-card {
    border-radius: 10px;
  }
}
</style>
