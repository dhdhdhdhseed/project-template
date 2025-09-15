<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { VueFlexWaterfall } from 'vue-flex-waterfall'

const data = ref([])
const baseData = ref([])
function getData() {
  axios.get('https://api.tuchong.com/feed-app').then((response) => {
    baseData.value = response.data.feedList
    data.value = JSON.parse(JSON.stringify(baseData.value))
  })
}
function loadMore() {
  data.value.push(...baseData.value)
}
onMounted(() => {
  getData()
})
</script>

<template>
  <div class="page-test2">
    <VueFlexWaterfall
      align-content="center"
      col="4"
      col-spacing="15"
    >
      <div
        v-for="item in data"
        :key="item.author_id"
        style="
          width: calc(25% - 20px);
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 15px;
        "
      >
        <el-image
          v-if="item.site.icon"
          :src="item.site.icon"
          style="width: 100%; border-radius: 10px"
        />
        <h4>{{ item.title }}</h4>
        <div style="display: flex; gap: 10px; flex-wrap: wrap">
          <el-tag v-for="value in item.tags" :key="value">
            {{ value }}
          </el-tag>
        </div>
        <div style="margin-top: 10px">
          {{ item.site?.description }}
        </div>
      </div>
    </VueFlexWaterfall>
    <div style="display: flex; justify-content: center">
      <el-button type="primary" @click="loadMore">
        点击加载更多
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-test2 {
  padding: 0 0 100px;
}
</style>
