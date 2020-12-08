<template>
  <div class="collect-songer">
    <ul>
      <li v-for="(item, index) of songer" :key="index">
        <img :src="item.picUrl" alt="logo" />
        <span>{{ item.name }}</span>
        <span>专辑:{{ item.albumSize }}</span>
        <span>MV:{{ item.mvSize }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSonger } from "@/api/collect/collect.js";
export default {
  name: "CollectSonger",
  data() {
    return {
      songer: [],
    };
  },
  created() {
    getSonger().then((res) => {
      this.songer = res.info;
      this.$emit("size", res.count);
    });
  },
};
</script>

<style lang="scss" scoped>
.collect-songer {
  ul {
    margin-bottom: 0;
    li {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &:nth-child(odd) {
        background-color: rgb(243, 237, 237);
      }
      img {
        width: 62px;
        height: 62px;
        object-fit: cover;
        border-radius: 5px;
        margin-right: 10px;
      }
      span:nth-child(2) {
        width: 300px;
      }
      span:nth-child(3) {
        width: 70px;
      }
      span:nth-child(4) {
        margin-left: 240px;
      }
    }
  }
}
</style>