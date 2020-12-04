<template>
  <div
    class="t-content"
    v-show="visible"
    :style="{ animationName: back ? 'tFadeIn' : 'tFadeOut' }"
    ref="pop"
  >
    <p class="tit">全部歌曲</p>
    <ul>
      <li v-for="(value, key, index) in categories" :key="key">
        <div class="left">
          <i
            class="custom-icon"
            :style="{ color: colors[index] }"
            :class="icon[index]"
          ></i>
          <span>{{ value }}</span>
        </div>
        <div class="right">
          <span
            v-for="(item, subidx) in diffcat[index]"
            :key="subidx"
            :class="item.name == tag ? 'currsel' : ''"
            @click="change(item.name)"
          >
            {{ item.name }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// custom-icon-hot2
let icon = [
  "custom-icon-earth",
  "custom-icon-piano",
  "custom-icon-tea",
  "custom-icon-smile",
  "custom-icon-tubiaopailie",
];
let colors = ["#ffc312", "#eb2f06", "#e74c3c", "#0fb9b1", "#3498db"];
export default {
  name: "SeriesSelect",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    back: { type: Boolean, default: true },
    selectcat: { type: Array, required: true },
    categories: { type: Object, required: true },
    tag: { required: true },
  },
  data() {
    return {
      icon,
      colors,
    };
  },
  computed: {
    diffcat() {
      let res = [[], [], [], [], []];
      for (let i = 0; i < this.selectcat.length; i++) {
        let obj = new Object();
        obj.name = this.selectcat[i].name;
        obj.hot = this.selectcat[i].hot;
        let cat = this.selectcat[i].category;
        res[cat].push(obj);
      }
      return res;
    },
  },
  mounted() {
    this.$refs.pop.addEventListener("animationend", this.aniEnd);
  },
  methods: {
    aniEnd(e) {
      if (e.animationName == "tFadeOut") {
        this.$emit("close");
      }
    },
    change(name) {
      this.$emit("labelchange", name);
    },
  },
};
</script>

<style lang="scss">
@keyframes tFadeIn {
  0% {
    width: 500px;
    height: 300px;
    opacity: 0;
  }
  100% {
    width: 700px;
    height: 490px;
    opacity: 1;
  }
}
@keyframes tFadeOut {
  0% {
    width: 700px;
    height: 490px;
    opacity: 1;
  }
  100% {
    width: 500px;
    height: 300px;
    opacity: 0;
  }
}
.t-content {
  width: 700px;
  background-color: white;
  position: absolute;
  top: 34px;
  z-index: 9;
  animation: 0.3s ease-in-out forwards;
  border-radius: 5px;
  ul {
    margin-bottom: 0;
    li {
      display: flex;
      margin-bottom: 10px;
      .left {
        display: flex;
        width: 90px;
        align-items: center;
        justify-content: center;
        .custom-icon {
          font-size: 20px;
        }
      }
      .right {
        width: calc(100% - 90px);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        span {
          width: 90px;
          display: inline-block;
          margin: 2px;
          padding: 2px 0;
          text-align: center;
          border-radius: 12px;
          cursor: pointer;
          &:hover {
            color: #ec4141;
          }
        }
        .currsel {
          background-color: #f0d1d1;
          color: #ec4141;
        }
      }
    }
  }
  .tit {
    background-color: #fff;
    padding: 16px;
    border-bottom: 1px solid #bdc3c7;
    font-size: 16px;
    border-radius: 5px 5px 0 0;
  }
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    background-color: white;
    position: absolute;
    left: 40px;
    transform: rotate(45deg) translateY(-6px);
    border-radius: 3px 0 0 0;
  }
}
</style>