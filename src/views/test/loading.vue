<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const letters = 'LANMAN'.split('')
const currentIndex = ref(0)
const flippedIndices = ref<any[]>(Array.from({ length: letters.length }).fill(false))
const isHiding = ref(false) // 控制是显示阶段还是隐藏阶段
let intervalId: number | null = null

function processNextLetter() {
  if (!isHiding.value) {
    // 显示阶段：逐个翻转字母显示
    flippedIndices.value[currentIndex.value] = true

    // 如果所有字母都已翻转，则切换到隐藏阶段
    if (currentIndex.value === letters.length - 1) {
      isHiding.value = true
      currentIndex.value = 0 // 从第一个字母开始隐藏
    }
    else {
      currentIndex.value = (currentIndex.value + 1) % letters.length
    }
  }
  else {
    // 隐藏阶段：逐个翻转字母隐藏
    flippedIndices.value[currentIndex.value] = false

    // 如果所有字母都已隐藏，则切换回显示阶段
    if (currentIndex.value === letters.length - 1) {
      isHiding.value = false
      currentIndex.value = 0 // 从第一个字母开始显示
    }
    else {
      currentIndex.value = (currentIndex.value + 1) % letters.length
    }
  }
}

onMounted(() => {
  // 立即开始处理第一个字母
  setTimeout(() => {
    processNextLetter()
    intervalId = window.setInterval(processNextLetter, 400)
  }, 300)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="loading-container">
    <div class="loading-text">
      <!-- 背景边框文字 -->
      <span
        v-for="(letter, index) in letters"
        :key="`outline-${index}`"
        class="letter-outline"
      >
        {{ letter }}
      </span>
    </div>
    <div class="loading-text overlay">
      <!-- 前景翻转文字 -->
      <span
        v-for="(letter, index) in letters"
        :key="`fill-${index}`"
        :class="{ flipped: flippedIndices[index] }"
        class="letter-fill"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  position: relative;
}

.loading-text {
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  display: flex;
  gap: 0.5rem;
}

.overlay {
  position: absolute;
}

.letter-outline {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 2px #1890ff;
}

.letter-fill {
  display: inline-block;
  color: white;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
  transform: rotateY(90deg); /* 默认90度倾斜 */
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.flipped {
  transform: rotateY(0deg); /* 翻转回正常位置并保持 */
}
</style>
