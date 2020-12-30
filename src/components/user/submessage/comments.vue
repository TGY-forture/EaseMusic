<template>
  <div class="u-sub-comments">
    <ul>
      <li v-for="item in comments" :key="item.time">
        <img :src="item.avatarUrl" alt="logo" />
        <div>
          <p>
            <span>{{ item.nickname }}</span>
            <span>{{ timeTrans(item.time) }}</span>
          </p>
          <p>回复我:{{ item.content }}</p>
          <p>{{ item.beRepliedContent }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getComments } from "@/api/userinfo/message.js";
export default {
  name: "comments",
  data() {
    return {
      comments: [],
    };
  },
  mounted() {
    getComments().then((data) => {
      this.comments = data;
    });
  },
  methods: {
    timeTrans(ms) {
      const time = new Date(ms);
      const now = new Date();
      const year = time.getFullYear();
      const mon = time.getMonth() + 1;
      const date = time.getDate();
      if (now.getFullYear() === year) {
        return mon + "月" + date + "日";
      } else {
        return year + "年" + mon + "月" + date + "日";
      }
    },
  },
};
</script>

<style lang="scss">
.u-sub-comments {
  width: 100%;
  ul {
    margin-bottom: 0;
    li {
      display: flex;
      margin-top: 15px;
      img {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-right: 10px;
      }
      div {
        width: calc(100% - 42px);
        font-size: 12px;
        p {
          margin-bottom: 8px;
          &:first-child {
            display: flex;
            justify-content: space-between;
            span:first-child {
              color: rgb(52, 148, 212);
            }
          }
          &:nth-child(3) {
            padding: 8px 10px;
            background-color: rgb(218, 211, 211);
            border-radius: 6px;
          }
        }
      }
    }
  }
}
</style>