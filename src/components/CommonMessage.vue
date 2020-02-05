// 系统消息
<template>
  <div class="message-wrap">
    <span>{{ content }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MessageBox extends Vue {
  @Prop() private content!: string;
}
</script>

<style scoped lang="less">
.message-wrap {
  text-align: center;
}
.message-wrap > span {
  display: inline-block;
  padding: 0 10px;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  border-radius: 5px;
  background-color: #dadada;
}
</style>