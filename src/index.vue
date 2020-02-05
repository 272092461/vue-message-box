<template>
  <div id="app">
    <MessageBox
      ref="messageBox"
      :data="messages"
      :contactAvatarUrl="contactAvatarUrl"
      :ownerAvatarUrl="ownerAvatarUrl"
      :loading="loading"
      @nextPage="nextPageHandle"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MessageBox from "./components/MessageBox.vue";

@Component({
  components: {
    MessageBox
  }
})
export default class App extends Vue {
  messages = [
    {
      direction: 2, // 发出方 为2表示owner，1表示contact，3表示系统
      id: 1, // 根据这个来排序消息
      type: 1, // 1为文本，2为图片
      content: "你好!![呲牙]", // 当type为1时这里是文本消息，当type2为2时这里要存放图片地址；后续会支持语音的显示
      ctime: new Date().toLocaleString() // 显示当前消息的发送时间
    },
    {
      direction: 1,
      id: 2,
      type: 1,
      content: "你也好。[害羞]",
      ctime: new Date().toLocaleString()
    },
    {
      direction: 2,
      id: 2,
      type: 1,
      content: "2333",
      ctime: new Date().toLocaleString()
    },
    {
      direction: 2,
      id: 2,
      type: 2,
      content: require("./assets/shin.jpg"),
      ctime: new Date().toLocaleString()
    },
    {
      direction: 3,
      id: 2,
      type: 1,
      content: "你撤回一条消息",
      ctime: new Date().toLocaleString()
    }
  ];
  contactAvatarUrl = require("./assets/avatar.jpeg");
  contactNickname = "";
  ownerAvatarUrl = require("./assets/shin.jpg");
  ownerNickname = "";
  loading = false;

  mounted(): void {
    // 插入测试数据
    for (let i = 0; i < 100; i++) {
      this.messages.push(
        {
          direction: (i % 2) + 1,
          id: 2,
          type: 1,
          content: "2333",
          ctime: new Date().toLocaleString()
        },
        {
          direction: 3,
          id: 2,
          type: 1,
          content: "你撤回一条消息",
          ctime: new Date().toLocaleString()
        }
      );
    }
    // this.messages = this.messages.concat(Array(1000).fill({
    //   direction: 2,
    //   id: 2,
    //   type: 1,
    //   content: '2333',
    //   ctime: new Date().toLocaleString()
    // }))

    this.messages.push({
      direction: 1,
      id: 2,
      type: 2,
      content: require("./assets/shin.jpg"),
      ctime: new Date().toLocaleString()
    });
  }

  async nextPageHandle() {
    this.loading = true;
    const data = await this.getHistoryMessage(0, 0);
    this.messages = data.concat(this.messages);
    this.loading = false;
    const messageBox: any = this.$refs.messageBox;
    // 滚动到未插入前的记录
    messageBox.scrollToTop();
  }

  async getHistoryMessage(nextId: number, limit: number): Promise<Array<any>> {
    return Promise.resolve([
      {
        direction: 1,
        id: 3,
        type: 2,
        content: require("./assets/shin.jpg"),
        ctime: new Date().toLocaleString()
      },
      {
        direction: 2,
        id: 3,
        type: 1,
        content: "你好",
        ctime: new Date().toLocaleString()
      }
    ]);
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 750px;
  height: 600px;
  overflow: auto;
  margin: auto;
}
</style>
