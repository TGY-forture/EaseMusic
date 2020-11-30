<template>
  <div class="songer-page">
    <div class="f-con">
      <a href="javascript:void 0;"><span>语种:</span></a>
      <a
        href="javascript:void 0;"
        v-for="(item, index) of lang"
        :key="index"
        @click="li = index"
      >
        <span :style="li == index ? styobj : ''">{{ item }}</span>
      </a>
    </div>
    <div class="f-con">
      <a href="javascript:void 0;"><span>分类:</span></a>
      <a
        href="javascript:void 0;"
        v-for="(item, index) of kind"
        :key="index"
        @click="ki = index"
      >
        <span :style="ki == index ? styobj : ''">{{ item }}</span>
      </a>
    </div>
    <div class="t-con">
      <span>筛选:</span>
      <div>
        <a
          href="javascript:void 0;"
          v-for="(item, index) of word"
          :key="index"
          @click="ni = index"
        >
          <span :style="ni == index ? styobj : ''">
            {{ item }}
          </span>
        </a>
      </div>
    </div>
    <div class="songer-list">
      <div v-for="(item, index) of songerList" :key="index">
        <img :src="item.img1v1Url" alt="logo" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
let lang = ["全部", "华语", "欧美", "日本", "韩国", "其他"];
let kind = ["全部", "男歌手", "女歌手", "乐队组合"];
let word = [
  "热门",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "#",
];
export default {
  name: "Songer",
  data() {
    return {
      word,
      lang,
      kind,
      li: 0,
      ki: 0,
      ni: 0,
      songer: [],
    };
  },

  created() {
    this.$axios
      .get("http://localhost:8081/testdata/songer.json")
      .then(({ data }) => {
        this.songer = data.artists;
      });
  },
  computed: {
    styobj() {
      return {
        color: "rgb(184, 60, 80)",
        backgroundColor: "rgb(211, 173, 178)",
      };
    },
    songerList() {
      let t = this.songer.map((item) => {
        return {
          img1v1Url: item.img1v1Url,
          name: item.name,
        };
      });
      t.unshift({
        img1v1Url:
          "http://p2.music.126.net/MJdmNzZwTCz0b4IpHJV6Wg==/109951162865487429.jpg",
        name: "歌手排行榜",
      });
      return t;
    },
  },
};
</script>

<style lang="scss">
.songer-page {
  padding: 0 10px 0 20px;
  .f-con {
    margin: 6px 0;
    a {
      display: inline-block;
      &:not(:first-child) {
        width: 90px;
        color: rgb(143, 131, 131);
        text-align: center;
        border-right: 1px solid#d6d5d5;
        span {
          padding: 0 10px;
          border-radius: 9px;
        }
      }
      &:first-child {
        cursor: default;
        color: black;
      }
      &:last-child {
        border: none;
      }
    }
  }
  .t-con {
    display: flex;
    & > span {
      width: 32px;
      display: inline-block;
      cursor: default;
      color: black;
    }
    div {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 36px);
      a {
        display: inline-block;
        width: 90px;
        text-align: center;
        border-right: 1px solid#d6d5d5;
        margin: 5px 0;
        span {
          color: rgb(143, 131, 131);
          padding: 0 12px;
          border-radius: 9px;
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
  .songer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    cursor: pointer;
    div {
      width: 140px;
      margin-bottom: 5px;
      &:not(:nth-child(5n)) {
        margin-right: 18px;
      }
      img {
        width: 140px;
        height: 140px;
        border-radius: 6px;
      }
    }
  }
}
</style>