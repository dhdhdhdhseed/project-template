<script lang="ts" setup></script>

<template>
  <div class="page-text">
    <div v-for="item in 8" :key="item" class="_item">
      <div class="_item-content" />
    </div>
    <!-- <div class="_circular" /> -->
  </div>
  <div class="diamond" />
  <div id="diamond" />
</template>

<style lang="scss" scoped>
.diamond {
  width: 120px;
  height: 190px;
  background: #ffc000;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}
#diamond {
  width: 100px;
  height: 100px;
  background: #1eff00;
  border-radius: 50% 50% 50% 0;
  transform: rotate(315deg) scale(1);
  margin: 0 auto;
  &:hover {
    transform: rotate(315deg) translateY(20px) scale(1.5);
  }
}
.page-text {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  position: relative;
  height: 100px; // 增加高度，方便展示圆形布局
  margin: 100px;
  ._circular {
    position: absolute;
    top: 40px;
    border: 1px solid yellow;
    width: 140px;
    height: 140px;
    z-index: 10;
    border-radius: 50%;
    background-color: #fff;
  }

  ._item {
    width: 80px;
    height: 80px;
    // border: 1px solid red;
    position: absolute;
    top: 0; // 所有 item 的底部对齐父容器的底部中心
    left: 50%;
    transform: translateX(-50%);
    transform-origin: 50% 140%; // 旋转原点设置为底部中心
    transition: transform 0.3s;
    // border-radius: 50%;

    ._item-content {
      width: 100%;
      height: 100%;
      border: 1px solid red;
      transform-origin: 50% 140%;
      border-radius: 50% 50% 50% 0;
      transform: rotate(315deg) scale(1);
    }

    @for $i from 1 through 8 {
      &:nth-child(#{$i}) {
        $angle: ($i - 1) * 360/8 * 1deg;
        --rotate: #{$angle};
        transform: translateX(-50%) rotate($angle);
      }
    }

    &:hover {
      ._item-content {
        transform: rotate(315deg) translateY(-20px) scale(1);
      }
    }
  }
}
</style>
