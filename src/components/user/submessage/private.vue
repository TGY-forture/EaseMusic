<template>
  <div class="u-sub-private">
    <ul>
      <li v-for="item of privateinfo" :key="item.lastMsgTime">
        <div>
          <img :src="item.avatarUrl" alt="logo" />
          <img
            v-if="item.identityIconUrl"
            :src="item.identityIconUrl"
            alt="logo"
          />
        </div>
        <div>
          <p>
            <span> {{ item.nickname }}</span>
            <span>{{ timeTrans(item.lastMsgTime) }}</span>
          </p>
          <p>{{ item.lastMsg.msg }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPrivate } from "@/api/userinfo/message.js";
export default {
  name: "private",
  data() {
    return {
      privateinfo: [],
    };
  },
  created() {
    getPrivate().then((data) => {
      this.privateinfo = data;
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
.u-sub-private {
  width: 100%;
  ul {
    margin-bottom: 0;
    li {
      display: flex;
      margin-top: 16px;
      div:first-child {
        position: relative;
        margin-right: 10px;
        img {
          border-radius: 50%;
          &:first-child {
            width: 36px;
            height: 36px;
          }
          &:nth-child(2) {
            width: 12px;
            height: 12px;
            position: absolute;
            bottom: 0px;
            right: -4px;
          }
        }
      }
      div:nth-child(2) {
        width: calc(100% - 46px);
        p {
          margin-bottom: 0;
          font-size: 12px;
          &:first-child {
            display: flex;
            justify-content: space-between;
            span:first-child {
              color: rgb(87, 163, 235);
            }
            span:nth-child(2) {
              color: rgb(197, 190, 190);
              font-size: 10px;
            }
          }
          &:nth-child(2) {
            font-size: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>