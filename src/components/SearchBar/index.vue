<template>
  <div class="search-bar">
    <el-form ref="searchFormRef" :model="searchForm" :inline="true" v-if="formConfig.length > 0">
      <el-row :gutter="20">
        <el-col :span="item.span || 6" v-for="(item, index) in formConfig" :key="index">
          <el-form-item :label="item.label" :prop="item.value" :label-width="labelWidth">
            <!-- 输入框 -->
            <el-input v-if="item.type === 'input'" v-model="searchForm[item.value]" :placeholder="item.placeholder"
              clearable />
            <!-- 选择栏 -->
            <el-select v-else-if="item.type === 'select'" v-model="searchForm[item.value]"
              :placeholder="item.placeholder" clearable>
              <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                :value="option.value" />
            </el-select>
            <!-- 时间选择 -->
            <el-date-picker v-else-if="item.type === 'time'" v-model="searchForm[item.value]" type="datetimerange"
              start-placeholder="开始时间" end-placeholder="结束时间" :default-time="defaultTime" format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss" />
            <!-- 大小范围输入 -->
            <div class="custom_section_input" style="display: flex;" v-else-if="item.type === 'num_range'">
              <input class="firstInput" style="width: 100px;" :value="getMinNum(searchForm[item.value])"
                :placeholder="item.placeholder" @input="(val: any) => {
                  const value = val.target.value.replace(/[^0-9.]/g, '')
                  searchForm[item.value][0] = value
                }" />
              <el-input placeholder="~" style="pointerEvents:none;padding: 0;width: 30px;border-radius: 0 ;" />
              <input style="width: 100px;" :value="getMaxNum(searchForm[item.value])" :placeholder="item.placeholder"
                @input="(val: any) => {
                  const value = val.target.value.replace(/[^0-9.]/g, '')
                  searchForm[item.value][1] = value
                }" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div style="white-space: nowrap;margin-bottom: 18px;">
            <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
            <el-button :icon="Refresh" @click="handleReset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-skeleton v-else style="padding-bottom: 20px">
      <template #template>
        <div style="height: 32px; display: flex; align-items: center; justify-items: space-between">
          <el-skeleton-item variant="text" style="margin-right: 16px; height: 32px; width: 200px" />
          <el-skeleton-item variant="text" style="margin-right: 16px; height: 32px; width: 200px" />
          <el-skeleton-item variant="text" style="margin-right: 16px; height: 32px; width: 200px" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { Search, Refresh } from '@element-plus/icons-vue'
import { defineProps, ref } from 'vue'
// 定义组件的属性
const props = defineProps({
  // formConfig: 表单配置数组，用于动态生成表单项
  formConfig: <any>{
    type: Array,
    required: true
  },
  searchForm: {
    type: Object,
    required: true
  },
  labelWidth: {
    type: String,
    default: ''
  }
})

const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
])
function getMinNum(val: any) {
  if (val?.length > 0) {
    return val[0]
  }
}
function getMaxNum(val: any) {
  if (val?.length > 0) {
    return val[1]
  }
}

const searchFormRef = ref()
const emits = defineEmits(['search', 'reset'])

const handleSearch = () => {
  emits('search', props.searchForm)
}

const handleReset = () => {
  searchFormRef.value?.resetFields()
  emits('reset')
}
</script>

<style scoped lang="scss">
.custom_section_input {
  ::v-deep(.el-input__wrapper) {
    border-radius: 0 !important;
    box-shadow: none;
    border: 1px solid #dcdfe6;
    border-right: none;
    border-left: none;
  }

  input:nth-child(1) {
    padding: 1px 11px;
    border-radius: 4px 0 0 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    border-right: none;
    color: #606266;

    &:focus {
      /* 移除默认的聚焦轮廓线（可选） */
      outline: none;
      border: 1px solid #006f8b;
      border-right: none;
    }
  }

  input:nth-child(3) {
    padding: 1px 11px;
    border-radius: 0 4px 4px 0;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    border-left: none;
    color: #606266;

    &:focus {
      /* 移除默认的聚焦轮廓线（可选） */
      outline: none;
      border: 1px solid #006f8b;
      border-left: none;
    }
  }
}

.search-bar {
  width: 100%;
  background: #fff;

  .left {
    flex: 1;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 24px;
    max-width: 200px;
  }
}

.el-form-item {
  width: 100%;

  .el-form-item__content {
    width: 100%;
  }
}

.el-input,
.el-select {
  width: 100%;
}
</style>
