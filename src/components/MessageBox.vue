<template>
  <div class="box-wrap" ref="content">
    <div v-for="message of viewMessages" ref="messageDoms" :key="message.id">
      <MessageLine
        :message="message"
        :contactAvatarUrl="contactAvatarUrl"
        :ownerAvatarUrl="ownerAvatarUrl"
      >
        <UserMessage
          v-if="message.direction !== 3"
          :type="message.type"
          :content="message.content"
        />
        <CommonMessage v-else :content="message.content" />
        <!-- {{ message.content }} -->
      </MessageLine>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MessageLine from "./MessageLine.vue";
import UserMessage from "./UserMessage.vue";
import CommonMessage from "./CommonMessage.vue";

@Component({
  components: {
    MessageLine,
    UserMessage,
    CommonMessage
  }
})
export default class MessageBox extends Vue {
  @Prop() private data!: Array<object>;
  @Prop() private loading: boolean = false;
  @Prop() private finished: boolean = false;
  @Prop() private ownerAvatarUrl!: string;
  @Prop() private contactAvatarUrl!: string;
  @Prop() private width?: number;
  @Prop() private height?: number;

  size = 0;
  scrollDom: any;
  messageDoms: any;
  topDom: any;
  oldScrollHeight = 0;
  pending = false;

  constructor() {
    super();
    // this.size = this.data.length > 10 ? 10 : this.data.length
    this.size = 10;
  }

  get viewMessages(): Array<object> {
    const count = this.size > this.data.length ? this.data.length : this.size;
    // 加载消息
    let views = this.data.slice(this.data.length - count, this.data.length);
    // 隐藏部分消息
    // views = views.slice(0, 100);
    return views;
  }

  mounted() {
    this.$nextTick(() => {
      this.initScrollDom();
      this.initEvent(this.scrollDom);
    });
  }
  destroyed() {
    this.removeEvent(this.scrollDom);
  }

  /**
   * 访问历史记录
   */
  onScrollTop() {
    const { loading, finished, data, size, pending } = this;
    if (loading || finished || pending) {
      return;
    }
    // this.topDom = this.messageDoms[0];
    this.pending = true;
    this.oldScrollHeight = this.scrollDom.scrollHeight;
    if (size > data.length) {
      this.$emit("nextPage");
      // this.pending = false;
    } else {
      this.size = size + 10;
      this.$nextTick(() => {
        // this.topDom.scrollIntoView(true);
        this.pending = false;
        this.scrollTo(this.scrollDom.scrollHeight - this.oldScrollHeight);
      });
    }
  }

  /**
   * 恢复隐藏数据
   */
  onScrollBottom() {
    const { loading, finished, size, pending } = this;
    const oldDom = this.messageDoms[this.messageDoms.length - 1];
    if (loading || finished || pending) {
      return;
    }

    this.pending = true;
    if (size > 150) {
      this.size = size - 50;
    } else if (size > 100) {
      this.size = 100;
    }
    setTimeout(() => (this.pending = false), 100);
  }

  scrollTo(top: number) {
    this.scrollDom.scrollTop = top;
  }

  scrollToTop() {
    this.$nextTick(() => {
      // this.topDom.scrollIntoView(true);
      this.scrollTo(this.scrollDom.scrollHeight - this.oldScrollHeight);
      this.pending = false;
    });
  }

  scrollBottom() {
    this.size = 10;
    this.scrollTo(this.scrollDom.scrollHeight - this.scrollDom.clientHeight);
  }

  initScrollDom() {
    this.scrollDom = this.$refs.content;
    this.messageDoms = this.$refs.messageDoms;
    setTimeout(() => this.scrollBottom(), 200);
    // TODO: 图片消息未加载完成无法顺利滚动到底部
    // this.$nextTick(() => this.scrollBottom())
  }

  initEvent(dom: Element) {
    dom.addEventListener("scroll", this.scrollHander);
  }

  removeEvent(dom: Element) {
    dom.removeEventListener("scroll", this.scrollHander);
  }

  scrollHander(): void {
    const { loading, finished, pending } = this;
    if (loading || finished || pending) {
      return;
    }

    const top = this.scrollDom.scrollTop;
    const height = this.scrollDom.scrollHeight;
    const offsetHeight = this.scrollDom.offsetHeight;
    if (top < 5) {
      this.onScrollTop();
    } else if (offsetHeight + top + 100 >= height) {
      // this.onScrollBottom();
    }
  }
}
</script>

<style scoped lang="less">
.box-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
  overflow-y: scroll;
  background: #efefef;
}
</style>
