<script lang="ts" setup>
import type { EditDialogVue } from './components/EditDialog.vue'
import { ref } from 'vue'
import EditDialog from './components/EditDialog.vue'

interface UserInfo {
  id: string
  name: string
  age: number
}
const tableData = ref<UserInfo[]>([
  {
    id: '1',
    age: 12,
    name: 'Tom',
  },
  {
    id: '2',
    age: 12,
    name: 'Tom',
  },
  {
    id: '3',
    age: 12,
    name: 'Tom',
  },
])

const editDialogRef = ref<EditDialogVue | null>(null)
const dialogData = ref<UserInfo>()
function onEdit(row?: UserInfo) {
  if (row) {
    dialogData.value = { ...row }
  }
  if (editDialogRef.value) {
    editDialogRef.value.visible = true
  }
}
</script>

<template>
  <div>
    <el-button type="primary" @click="onEdit">
      创建用户
    </el-button>
    <el-table :data="tableData">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
      <el-table-column label="Action">
        <template #default="scope">
          <el-button type="primary" size="small" @click="onEdit(scope.row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditDialog ref="editDialogRef" :dialog-data="dialogData!" />
  </div>
</template>
