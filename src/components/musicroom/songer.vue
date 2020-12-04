<template>
  <div class="songer-page">
    <div class="f-con">
      <a href="javascript:void 0;"><span>语种:</span></a>
      <a
        href="javascript:void 0;"
        v-for="(item, index) of lang"
        :key="index"
        @click="update(null, type, item.area, initial)"
      >
        <span :style="area == item.area ? styobj : ''" :area="item.area">
          {{ item.name }}
        </span>
      </a>
    </div>
    <div class="f-con">
      <a href="javascript:void 0;"><span>分类:</span></a>
      <a
        href="javascript:void 0;"
        v-for="(item, index) of kind"
        :key="index"
        @click="update(null, item.type, area, initial)"
      >
        <span :style="type == item.type ? styobj : ''" :type="item.type">
          {{ item.name }}
        </span>
      </a>
    </div>
    <div class="t-con">
      <span>筛选:</span>
      <div>
        <a
          href="javascript:void 0;"
          v-for="(item, index) of word"
          :key="index"
          @click="update(null, type, area, initialword[index])"
        >
          <span
            :style="initial == initialword[index] ? styobj : ''"
            :initial="initialword[index]"
          >
            {{ item }}
          </span>
        </a>
      </div>
    </div>
    <div class="songer-list">
      <div v-for="(item, index) of songer" :key="index">
        <img :src="item.img1v1Url" alt="logo" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongerList } from "@/api/songer.js";
let lang = [
  { name: "全部", area: -1 },
  { name: "华语", area: 7 },
  { name: "欧美", area: 96 },
  { name: "日本", area: 8 },
  { name: "韩国", area: 16 },
  { name: "其他", area: 0 },
];
let kind = [
  { name: "全部", type: -1 },
  { name: "男歌手", type: 1 },
  { name: "女歌手", type: 2 },
  { name: "乐队组合", type: 3 },
];
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
      type: -1,
      area: -1,
      initial: -1,
      songer: [],
    };
  },

  created() {
    getSongerList().then((res) => {
      this.songer = res;
    });
  },
  computed: {
    styobj() {
      return {
        color: "rgb(184, 60, 80)",
        backgroundColor: "rgb(211, 173, 178)",
      };
    },
    initialword() {
      const ret = [];
      for (let i = 1; i < this.word.length - 1; i++) {
        ret.push(this.word[i].toLowerCase());
      }
      ret.unshift(-1);
      ret.push(0);
      return ret;
    },
  },
  methods: {
    update: function (e, type, area, initial) {
      getSongerList(type, area, initial).then((res) => {
        this.songer = res;
      });
      this.type = type;
      this.area = area;
      this.initial = initial;
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