<template>
  <div class="collect-album">
    <ul>
      <li v-for="(item, index) of album" :key="index">
        <img :src="item.picUrl" alt="logo" />
        <span>{{ item.name }}</span>
        <span>{{ item.artist }}</span>
        <span>{{ item.size }}首</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getAlbum } from "@/api/collect/collect.js";
export default {
  name: "CollectAlbum",
  data() {
    return {
      album: [],
      count: 0,
    };
  },
  created() {
    getAlbum().then((res) => {
      this.album = res.info;
      this.count = res.count;
      this.$emit("size", this.count);
    });
  },
};
</script>

<style lang="scss" scoped>
.collect-album {
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