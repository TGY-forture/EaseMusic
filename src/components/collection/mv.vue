<template>
  <div class="collect-mv">
    <div class="v-lists" v-for="(item, index) of video" :key="index">
      <img :src="item.coverUrl" alt="logo" />
      <p>{{ item.title }}</p>
      <p>by {{ item.name }}</p>
      <div class="right-up">
        <i class="custom-icon custom-icon-play2"></i>
        <span>{{ playcnt(item.playTime) }}</span>
      </div>
      <span>{{ time(item.durationms) }}</span>
    </div>
  </div>
</template>

<script>
import { getMv } from "@/api/collect/collect.js";
export default {
  name: "CollectMv",
  data() {
    return {
      video: [],
    };
  },
  created() {
    getMv().then((res) => {
      this.video = res.info;
      this.$emit("size", res.count);
    });
  },
  methods: {
    playcnt(pt) {
      if (pt > 10000) {
        let t = Math.trunc(pt / 10000);
        return t + "万";
      } else {
        return pt;
      }
    },
    time(ms) {
      const sec = Math.trunc(ms / 1000);
      const min = Math.trunc(sec / 60);
      const restsec = sec % 60;
      return min + ":" + restsec;
    },
  },
};
</script>

<style lang="scss" scoped>
.collect-mv {
  display: flex;
  .v-lists {
    position: relative;
    width: 246px;
    img {
      width: 246px;
      height: 144px;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    p {
      width: 100%;
      margin-bottom: 0;
      &:nth-child(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:nth-child(3) {
        font-size: 12px;
        color: rgb(187, 179, 179);
      }
    }
    div {
      position: absolute;
      top: 4px;
      right: 8px;
    }
    & > span {
      position: absolute;
      top: 125px;
      right: 8px;
    }
  }
}
</style>