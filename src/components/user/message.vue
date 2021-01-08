<template>
  <div class="u-message">
    <h3>消息</h3>
    <div class="dif-mes">
      <span
        v-for="(item, index) of mesinfo"
        :key="index"
        @click="changeInfo(index, item.name)"
        :class="index === si ? 'act' : ''"
      >
        {{ item.text }}
      </span>
    </div>
    <component :is="cpname"></component>
  </div>
</template>

<script>
import Private from "./submessage/private";
import Atme from "./submessage/atme";
import Comments from "./submessage/comments";
import Notify from "./submessage/notify";

export default {
  name: "message",
  components: {
    Private,
    Atme,
    Comments,
    Notify,
  },
  data() {
    return {
      mesinfo: [
        { text: "私信", name: "Private" },
        { text: "评论", name: "Comments" },
        { text: "@我", name: "Atme" },
        { text: "通知", name: "Notify" },
      ],
      si: 0,
      cpname: "Private",
    };
  },
  methods: {
    changeInfo(index, name) {
      this.si = index;
      this.cpname = name;
    },
  },
};
</script>

<style lang="scss">
.u-message {
  width: 360px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  height: 350px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #eaeef0;
    border-radius: 2px;
  }
  .dif-mes {
    width: 100%;
    border: 1px solid rgb(216, 210, 210);
    border-radius: 14px;
    span {
      width: calc(100% / 4);
      border-radius: 14px;
      display: inline-block;
      text-align: center;
      padding: 4px 0;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background-color: rgb(243, 237, 237);
      }
    }
    .act {
      background-color: rgb(189, 182, 182);
      &:hover {
        background-color: rgb(189, 182, 182);
      }
    }
  }
}
</style>