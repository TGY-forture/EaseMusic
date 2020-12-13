<template>
  <div class="lyrics" v-show="show" @click="showLyric">
    <p>{{ showtext }}</p>
    <p ref="top" :style="trans" @transitioncancel="tranCancel" @transitionend="tranEnd">{{ showtext }}</p>
    <p>ccc</p>
  </div>
</template>

<script>
export default {
  name: "lyrics",
  props: {
    id: Number,
    show: Boolean,
    isplay: Boolean,
  },
  data() {
    return {
      steptime: [],
      lyric: [],
      showtext: "",
      index: 0,
      timer: null,
      ms: 0,
      transname: "width",
      width: 0,
    };
  },
  computed: {
    trans() {
      return {
        "transition-property": this.transname,
        "transition-duration": this.ms + "ms",
        width: this.width,
      };
    },
  },
  watch: {
    async id(nv, ov) {
      const {
        data: {
          lrc: { lyric },
        },
      } = await this.$axios.get(`http://localhost:3000/lyric?id=${this.id}`);
      this.lyricParse(lyric);
    },
    isplay(n, o) {
      if (n) {
        this.showLyric();
      } else {
        this.transname = "none";
      }
    },
  },
  mounted() {
    this.$refs.top.addEventListener("transitioncancel", this.tranCancel);
    this.$refs.top.addEventListener("transitionend", this.tranEnd);
  },
  methods: {
    lyricParse(lyric) {
      const patime = /\[([^\s\[\]]*)\]/g; //匹配时间
      const patcontent = /\]([^\[\]]*)\[/g; //匹配歌词
      // const split = /\[\S*\]/;    //使用split分割也行
      let lyr = lyric.replace(/\n/g, ""); //清除换行符
      let time = lyr.match(patime);
      let content = lyr.match(patcontent);
      content.forEach((el, index) => {
        content[index] = content[index].replace(/[\[\]]/g, ""); //去掉边界括号
      });
      time.forEach((el, index) => {
        const strtime = time[index].replace(/\[|\]/g, "");
        let strarr = strtime.split(":");
        const ft = parseInt(strarr[0]) * 60 * 1000; //ms毫秒
        const bt = Math.trunc(parseFloat(strarr[1]) * 1000);
        time[index] = ft + bt; //每句歌词应显示时间毫秒数
      });
      this.steptime = time;
      this.lyric = content;
      console.log(content, time);
    },
    showLyric() {
      //对于每一首歌可能执行多次
      this.ms = this.steptime[0] - 0;
      this.timer = setTimeout(this.timeout, this.ms);
    },
    timeout() {
      console.log("start time", Date.now());
      this.width = "100%";
      this.transname = "width";
      this.showtext = this.lyric[this.index];
      if (this.index + 1 >= this.steptime.length) {
        clearTimeout(this.timer);
        return;
      } else {
        this.index = this.index + 1;
      }
      this.ms = this.steptime[this.index] - this.steptime[this.index - 1];
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.timeout, this.ms);
    },
    tranCancel(e) {
      console.log("cancel");
    },
    tranEnd() {
      this.width = 0;
      this.transname = "none";
      console.log("end", Date.now());
    },
  },
};
</script>

<style lang="scss" scoped>
.lyrics {
  position: fixed;
  top: 90px;
  left: 200px;
  // background-color: rgb(8, 8, 8);
  p {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 0;
  }
  p:first-child {
    color: rgb(0, 153, 255);
  }
  p:nth-child(2) {
    position: absolute;
    color: rgb(255, 174, 0);
    top: 0;
    transition-timing-function: linear;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
