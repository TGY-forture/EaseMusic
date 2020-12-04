<template>
  <div class="musicroom">
    <h1>音乐馆</h1>
    <div class="category">
      <router-link
        v-for="(item, index) in category"
        :key="index"
        :to="{ name: item.name }"
        exact
        exact-active-class="t-active"
      >
        {{ item.text }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
let category = [
  {
    text: "每日推荐",
    name: "recommand",
  },
  {
    text: "歌单",
    name: "musiclist",
  },
  {
    text: "电台",
    name: "dj",
  },
  {
    text: "排行榜",
    name: "toplist",
  },
  {
    text: "歌手",
    name: "songer",
  },
  {
    text: "最新音乐",
    name: "latestsong",
  },
];
export default {
  name: "MusicRoom",
  data() {
    return {
      category,
    };
  },
};
</script>

<style lang="scss">
.musicroom {
  height: calc(100% - 56px);
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
  h1 {
    font-weight: bold;
    margin-left: 20px;
  }
  .category {
    margin-bottom: 40px;
    margin-left: 20px;
    a {
      color: grey;
      font-size: 16px;
      margin-right: 26px;
      padding: 6px 0 0 0;
      transition: transform 0.1s;
      display: inline-block;
      font-family: "Courier New", Courier, monospace;
      border-bottom: 3px solid #f7f7f7;
    }
    .t-active {
      transform: scale(1.2, 1.2);
      color: black;
      border-bottom: 3px solid rgb(194, 21, 21);
    }
  }
}
</style>