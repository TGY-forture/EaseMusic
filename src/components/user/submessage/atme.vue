<template>
  <div class="u-sub-atme">
    <ul>
      <li v-for="item in atme" :key="item.time">
        <img :src="item.avatarUrl" alt="logo" />
        <div>
          <p>
            <span>{{ item.nickname }}</span>
            <span>{{ timeTrans(item.time) }}</span>
          </p>
          <p>评论:{{ item.content }}</p>
          <div class="if-album" v-if="item.resource.album">
            <img :src="item.resource.album.picUrl" alt="logo" />
            <div>
              <p>{{ item.resource.name }}</p>
              <p>{{ item.resource.artists[0].name }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getAtme } from "@/api/userinfo/message.js";
export default {
  name: "atme",
  data() {
    return {
      atme: [],
    };
  },
  created() {
    getAtme().then((data) => {
      this.atme = data;
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
.u-sub-atme {
  width: 100%;
  ul {
    margin-bottom: 0;
    li {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      img {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-right: 10px;
      }
      div:nth-child(2) {
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
        }
        .if-album {
          display: flex;
          background-color: rgb(218, 208, 208);
          padding: 5px 10px;
          border-radius: 6px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 6px;
          }
          p {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>