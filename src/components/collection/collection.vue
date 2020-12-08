<template>
  <div class="collection">
    <nav class="star-cate">
      <span
        :class="scnp == 'CollectAlbum' ? 'cate-active' : ''"
        @click="changeCnp('CollectAlbum')"
        >专辑</span
      >
      <span
        :class="scnp == 'CollectSonger' ? 'cate-active' : ''"
        @click="changeCnp('CollectSonger')"
        >歌手</span
      >
      <span
        :class="scnp == 'CollectMv' ? 'cate-active' : ''"
        @click="changeCnp('CollectMv')"
        >视频</span
      >
    </nav>
    <div class="common-nav">
      <p>收藏的{{ cate[scnp] }}({{ cnt }})</p>
      <Search :place="'搜索收藏' + cate[scnp]" />
    </div>
    <component v-on:size="getCount" :is="scnp"></component>
  </div>
</template>

<script>
import Search from "@/components/util/search";
import CollectAlbum from "@/components/collection/album";
import CollectMv from "@/components/collection/mv";
import CollectSonger from "@/components/collection/songer";

const cate = {
  CollectAlbum: "专辑",
  CollectSonger: "歌手",
  CollectMv: "视频",
};

export default {
  name: "collection",
  components: {
    Search,
    CollectAlbum,
    CollectMv,
    CollectSonger,
  },
  data() {
    return {
      cate,
      scnp: "CollectAlbum",
      cnt: 0,
    };
  },
  methods: {
    changeCnp(cnpname) {
      this.scnp = cnpname;
    },
    getCount(cnt) {
      this.cnt = cnt;
    },
  },
};
</script>

<style lang="scss">
.collection {
  height: calc(100% - 56px);
  padding: 0 10px 0 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b2bec3;
    border-radius: 2px;
  }
  .star-cate {
    font-size: 16px;
    margin: 20px 0;
    font-family: "Times New Roman", Times, serif;
    span {
      margin-right: 20px;
      padding: 4px 0;
      border-bottom: 2px solid transparent;
      transition: transform 0.1s;
      display: inline-block;
      color: rgb(150, 138, 138);
      cursor: pointer;
    }
    .cate-active {
      border-bottom-color: rgb(180, 16, 16);
      transform: scale(1.1, 1.1);
      color: black;
    }
  }
  .common-nav {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    p {
      margin-bottom: 0;
      margin-right: auto;
    }
  }
}
</style>