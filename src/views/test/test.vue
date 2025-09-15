<script lang="ts" setup>
import type { CheckboxValueType } from 'element-plus'
import type { FunctionalComponent } from 'vue'
import { getUserListApi } from '@/api/manageApi'
import Pagination from '@/components/Pagination/Pagination.vue'
import { Iphone, Message } from '@element-plus/icons-vue'
import { ElButton, ElCard, ElCheckbox, ElIcon, ElMessage, ElTag } from 'element-plus'
import { h, onMounted, ref, unref } from 'vue'

interface SelectionCellProps {
  value: boolean
  intermediate?: boolean
  onChange: (val: CheckboxValueType) => void
}

// 明确声明为 FunctionalComponent
const SelectionCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  intermediate = false,
  onChange,
}) => {
  return h(ElCheckbox, {
    onChange,
    modelValue: value,
    indeterminate: intermediate,
  })
}

const pagination = ref()
const columns = [
  {
    key: 'selection',
    width: 50,
    cellRenderer: ({ rowData }: any) => [
      h(SelectionCell, {
        value: rowData.checked,
        onChange: (val) => {
          rowData.checked = val
        },
      }),
    ],
    headerCellRenderer: () => {
      const _data = unref(tableData.value)
      const onChange = (value: any) =>
        (tableData.value = _data.map((row: any) => {
          row.checked = value
          return row
        }))
      const allSelected = _data.every(row => row.checked)
      const containsChecked = _data.some(row => row.checked)
      return h(SelectionCell, {
        value: allSelected,
        intermediate: containsChecked && !allSelected,
        onChange,
      })
    },
  },
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
      h(
        ElButton,
        {
          link: true,
          type: 'primary',
          onClick: () => {
            console.error('查看', rowData)
          },
        },
        () => '查看',
      ),
      h(
        ElButton,
        {
          link: true,
          type: 'primary',
          onClick: () => {
            console.error('编辑', rowData)
          },
        },
        () => '编辑',
      ),
      h(
        ElButton,
        {
          link: true,
          type: 'danger',
          onClick: () => {
            console.error('删除', rowData)
          },
        },
        () => '删除',
      ),
    ],
  },
]
const tableData = ref<any[]>([])
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

function onBatch() {
  ElMessage(`批量操作，当前选中：${tableData.value.filter(row => row.checked).length}`)
}

onMounted(() => {
  pagination.value.changePage(1)
})
</script>

<template>
  <div class="test-page">
    <ElCard>
      <div>
        <ElButton @click="onBatch">
          批量操作
        </ElButton>
      </div>
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
      <div style="margin-top: 20px">
        <Pagination
          ref="pagination"
          :total="100"
          :page-size="100"
          :sizes="[100, 500, 1000, 2000]"
          @pagination="getTableData"
        />
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
