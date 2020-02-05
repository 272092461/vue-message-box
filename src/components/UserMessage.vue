// 用户消息
<template>
  <div v-if="type === 1">
    {{ content }}
  </div>
  <div v-else-if="type === 2" class="clear-line-size">
    <img class="user-image" :src="content" alt="">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UserMessage extends Vue {
  @Prop() private type!: number;  // 消息类型 1为文本 2为图片
  @Prop() private content!: string; // 消息体 可能为文本或者url
}
</script>

<style scoped lang="less">
.user-image {
  width: auto;
  height: auto;
  max-width: 300px;
}
.clear-line-size {
  font-size: 0;
}
</style>