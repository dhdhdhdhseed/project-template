<script lang="ts" setup>
import type { PropType } from 'vue'
import { defineExpose, reactive, ref } from 'vue'

export interface EditDialogVue {
  visible: boolean
}
const props = defineProps({
  dialogData: {
    type: Object as PropType<{ id: string, name: string, age: number }>,
    required: true,
  },
})
const form = ref<{ id: string, name: string, age: number }>({ ...props.dialogData })
const visible = ref(false)
function submitEditApi(data: { id: string, name: string, age: number }) {
  console.log('编辑', data)
}
function submitCreateApi(data: { name: string, age: number }) {
  console.log('新建', data)
}

function handleSubmit() {
  if (form.value.id) {
    submitEditApi(form.value)
  }
  else {
    submitCreateApi(form.value)
  }
  visible.value = false
}

function onEnter() {
  form.value = { ...props.dialogData }
}

defineExpose({
  visible,
})
</script>

<template>
  <el-dialog v-model="visible" @open="onEnter">
    <el-form :model="form">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleSubmit">
      提交
    </el-button>
  </el-dialog>
</template>
