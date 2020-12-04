<template>
  <div class="t-banner" @mouseenter="show = true" @mouseleave="show = false">
    <img
      v-for="(item, index) in piecepic"
      :src="item.imageUrl || item.pic"
      :key="index"
      :style="state[index]"
      :class="mid && index == indexloop[1] ? 'jumpchange' : ''"
      @animationend="mid = false"
      alt="logo"
    />
    <div class="dot-all">
      <span
        class="dot"
        v-for="i in pictures.length"
        :key="i"
        @mouseenter="indexChange(i - 1)"
        :style="{ backgroundColor: i - 1 == index ? '#EA2027' : '#bdc3c7' }"
      ></span>
    </div>
    <i class="custom-icon custom-icon-Right" v-show="show" @click="change"></i>
    <i
      class="custom-icon custom-icon-Larrow"
      v-show="show"
      @click="reChange"
    ></i>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    pictures: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      state: [
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
      ],
      piecepic: [],
      bannerindex: 3, //下一个需要显示的图片索引
      show: false,
      index: 0, //指示点位置
      indexloop: [0, 1, 2], //界面图片从左到右对应索引(reactive)
      jump: false, //跳变标志
      mid: false, //中间图片切换缩放标志
      timer: 0,
    };
  },
  computed: {
    edge() {
      //图片边界索引
      return this.pictures.length - 1;
    },
    gap() {
      //间隔点边界索引
      return this.pictures.length - 3;
    },
  },
  watch: {
    pictures: function (npic) {
      this.piecepic = npic.slice(0, 3);
      this.bannerindex = npic.length > 3 ? 3 : 0;
    },
  },
  mounted() {
    // this.timer = setInterval(this.change, 5000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    change() {
      this.index = this.index + 1 > this.edge ? 0 : this.index + 1;
      //更新新的图片
      this.piecepic[this.indexloop[0]] = this.pictures[this.bannerindex];
      //关键逻辑在于让状态得以维系，便可不做其他复杂判断
      if (this.jump) {
        this.state.push(this.state.shift());
      } else {
        this.state.unshift(this.state.pop());
      }
      //
      this.indexloop.push(this.indexloop.shift());
      this.bannerindex =
        this.bannerindex + 1 > this.edge ? 0 : this.bannerindex + 1;
    },
    reChange() {
      //逆序返回时，下一张图片的索引应该对应回退
      this.bannerindex =
        this.bannerindex - 1 < 0 ? this.edge : this.bannerindex - 1;
      //
      this.index = this.index - 1 < 0 ? this.edge : this.index - 1;
      //找到回退时应该显示的第一张图片索引
      let index =
        this.bannerindex < 3
          ? this.bannerindex + (this.edge - 2)
          : this.bannerindex - 3;
      //图片赋值
      this.piecepic[this.indexloop[2]] = this.pictures[index];
      //关键逻辑
      if (this.jump) {
        this.state.unshift(this.state.pop());
      } else {
        this.state.push(this.state.shift());
      }
      //
      this.indexloop.unshift(this.indexloop.pop());
    },
    indexChange(index) {
      let distance = index - this.index; //获取两点差值
      if (distance == 1 || distance == -this.edge) {
        this.change();
        return;
      } else if (distance == -1 || distance == this.edge) {
        this.reChange();
        return;
      } else if (distance == 0) {
        return;
      }
      //不相邻才会执行以下代码
      this.mid = true; //中间图片应用缩放动画
      this.index = index;
      for (let i = index, j = 0; i < index + 3; i++, j++) {
        let t = i > this.edge ? i - (this.edge + 1) : i;
        this.piecepic[this.indexloop[2 - j]] = this.pictures[t]; //改变三幅图片
      }
      //得到下一个应该显示的图片(fuck,找了好半天的 bug)
      this.bannerindex = index + 3 > this.edge ? index - this.gap : index + 3;
      this.jump = !this.jump; //改变标志，执行不同的状态转移
      let leftindex = this.indexloop[0]; //当前位于左侧的图片
      let rightindex = this.indexloop[2]; //当前位于右侧的图片
      //交换两张图片位置
      this.state[leftindex].left = "360px";
      this.state[rightindex].left = "0";
      //更新左右两侧图片对应索引
      [this.indexloop[0], this.indexloop[2]] = [
        this.indexloop[2],
        this.indexloop[0],
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes zoomback {
  from {
    transform: scale(1.1, 1.1);
  }
  to {
    transform: scale(1.25, 1.25);
  }
}
.t-banner {
  position: relative;
  height: 170px;
  width: 720px;
  margin: 0 auto;
  img {
    width: 360px;
    height: 140px;
    border-radius: 6px;
    transition: all 0.7s;
    position: absolute;
    cursor: pointer;
  }
  .dot-all {
    position: absolute;
    bottom: -10px;
    width: 100%;
    text-align: center;
    span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 8px;
      cursor: pointer;
    }
  }
  .custom-icon {
    font-size: 30px;
    position: absolute;
    color: white;
    background-color: rgba(128, 128, 128, 0.5);
    line-height: 1;
    border-radius: 50%;
    top: 35%;
    cursor: pointer;
  }
  .custom-icon-Larrow {
    left: 10px;
  }
  .custom-icon-Right {
    right: 10px;
  }
  .tgy-btn {
    position: fixed;
    z-index: 7;
    top: 20px;
    left: 20px;
  }
  .jumpchange {
    animation: 0.7s zoomback;
  }
}
</style>
