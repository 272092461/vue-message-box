<template>
  <!-- 本人发送 -->
  <div v-if="message.direction === 2" class="line-wrap">
    <div class="owner-line">
      <span class="owner-text">
        <slot />
        <!-- {{ message.content }} -->
      </span>
      <span>
        <img class="message-avatar" :src="ownerAvatarUrl" alt="">
      </span>
    </div>
  </div>
  <!-- 对方发送 -->
  <div v-else-if="message.direction === 1" class="line-wrap">
    <div class="contact-line">
      <span>
        <img class="message-avatar" :src="contactAvatarUrl" alt="">
      </span>
      <span class="text">
        <slot />
        <!-- {{ message.content }} -->
      </span>
    </div>
  </div>
  <!-- 系统信息 (自定义) -->
  <div v-else-if="message.direction === 3" class="line-wrap">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MessageLine extends Vue {
  @Prop() private message!: object;
  @Prop() private contactAvatarUrl!: string;
  @Prop() private ownerAvatarUrl!: string;
}
</script>

<style scoped lang="less">
.line-wrap {
  overflow: hidden;
  padding: 5px 0;
}
.owner-line {
  text-align: right;
}
.contact-line {
  text-align: left;
}
.owner-line > span, .contact-line > span {
  display: inline-block;
  vertical-align: top;
}
.message-avatar {
  width: 45px;
  height: 45px;
  padding: 0 15px;
}
.owner-text {
  .text;
  background-color: #9eea6a;
}
.text {
  display: inline-block;
  position: relative;
  padding: 0 10px;
  max-width: calc(100% - 170px);
  min-height: 35px;
  line-height: 2.1;
  font-size: 15px;
  padding: 6px 10px;
  text-align: left;
  word-break: break-all;
  background-color: #fff;
  color: #000;
  border-radius: 4px;
  box-shadow: 0 1px 7px -5px #000;
}
</style>