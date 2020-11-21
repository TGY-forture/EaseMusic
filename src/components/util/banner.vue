<template>
  <div class="t-banner">
    <img
      v-for="(src, index) in piecepic"
      :src="src"
      :key="index"
      :style="state[index]"
      alt="logo"
    />
    <a-button class="btn" @click="change">切换</a-button>
    <a-button class="btn" @click="reChange">逆序</a-button>
  </div>
</template>

<script>
let bannerpics = [
  require("../../assets/img/0.jpg"),
  require("../../assets/img/1.jpg"),
  require("../../assets/img/2.jpg"),
  require("../../assets/img/3.jpg"),
  require("../../assets/img/4.jpg"),
  require("../../assets/img/5.jpg"),
  require("../../assets/img/6.jpg"),
  require("../../assets/img/7.jpg"),
  require("../../assets/img/8.jpg"),
  require("../../assets/img/9.jpg"),
];

let state = [
  {
    left: 0,
    transform: "scale(1,1)",
    "z-index": 0,
  },
  {
    left: "25%",
    transform: "scale(1.25,1.25)",
    "z-index": 3,
  },
  {
    left: "360px",
    "z-index": 0,
    transform: "scale(1,1)",
  },
];

export default {
  name: "Banner",
  data() {
    return {
      bannerpics,
      state,
      piecepic: bannerpics.slice(0, 3),
      bannerindex: 3,
      cnt: 0,
    };
  },
  methods: {
    change() {
      // setInterval(() => {
      this.piecepic[this.cnt] = this.bannerpics[this.bannerindex];
      this.bannerindex++;
      if (this.bannerindex > 9) {
        this.bannerindex = 0;
      }
      this.state.unshift(this.state.pop());
      this.cnt++;
      if (this.cnt > 2) {
        this.cnt = 0;
      }
      // }, 5000);
    },
    reChange() {
      this.cnt--;
      if (this.cnt < 0) {
        this.cnt = 2;
      }
      this.bannerindex--;
      if (this.bannerindex < 0) {
        this.bannerindex = 9;
      }
      let index =
        this.bannerindex < 3 ? this.bannerindex + 7 : this.bannerindex - 3;
      this.piecepic[this.cnt] = this.bannerpics[index];
      this.state.push(this.state.shift());
    },
  },
};
</script>

<style lang="scss" scoped>
.t-banner {
  position: relative;
  height: 180px;
  img {
    width: 360px;
    height: 140px;
    border-radius: 6px;
    transition: all 0.5s;
    position: absolute;
    cursor: pointer;
  }
}
.btn {
  position: relative;
  top: 150px;
}
</style>