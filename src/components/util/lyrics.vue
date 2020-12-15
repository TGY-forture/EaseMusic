<template>
  <div class="lyrics" v-show="show">
    <p>{{ showtext }}</p>
    <p ref="top" :style="trans">{{ showtext }}</p>
    <p>ccc</p>
  </div>
</template>

<script>
import Bus from "@/assets/bus.js";
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
      width: "0",
      remaintime: -1,
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
      this.reset();
    },
  },
  mounted() {
    Bus.$on("pauseOrPlay", this.showLyric);
    // Bus.$on("nextChange", this.reset);
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
      this.showtext = content[0]; //新歌重置
    },
    showLyric(play) {
      if (play) {
        //播放
        this.transname = "width"; //设置过渡属性
      } else {
        //暂停
        this.transname = "none"; //设定此属性过渡取消，触发 transitionCancel
        return; //歌曲暂停后不应再执行后续逻辑
      }
      if (this.remaintime === -1) {
        //代表未被暂停过，即第一直播放
        //每首歌第一句歌词不一定是0秒开始
        if (this.steptime[0] == 0) {
          this.width = "100%"; //完全显示歌词
          this.ms = this.steptime[1];
        } else {
          this.timer = setTimeout(() => {
            this.width = "100%"; //完全显示歌词
            this.ms = this.steptime[1] - this.steptime[0]; //设定过渡时间
          }, this.steptime[0]);
        }
      } else {
        //此时 remaintime必定不为 -1,即暂停后重新播放了
        this.width = "100%";
        this.transname = "width";
        this.ms = this.remaintime;
      }
    },
    tranCancel(e) {
      /**
       * bug
       */
      console.log("cancel");
      //过渡暂停，即歌曲暂停处理函数
      let altime = parseInt(e.elapsedTime * 1000); //获得已经过时间
      this.remaintime = this.ms - altime; //获得剩余时间
      let percent = (altime / this.ms).toPrecision(2); //获得比值
      this.width = percent.substring(2) + "%"; //定格上层歌词宽度
    },
    tranEnd() {
      console.log("end");
      //过渡结束，即一句歌词显示完毕
      if (this.index + 1 >= this.lyric.length) {
        //判断歌词是否结束
        if (this.timer) {
          clearTimeout(this.timer);
        }
        return;
      } else {
        //没有结束，拿到下一句歌词
        this.index = this.index + 1;
      }
      this.width = 0; //设定下一句歌词宽度为0
      this.transname = "none"; //移除过渡属性
      this.showtext = this.lyric[this.index]; //显示歌词
      if (this.timer) {
        clearTimeout(this.timer); //清除上一个定时器
      }
      /**
       * 这里不能同步改变 width等，会覆盖函数开头所设置的 0值
       * 并且应用过渡也无效，所以使用 setTimeout 向任务队列推入一个新的任务
       * 此时不会发生 width覆盖的情况，过渡也会有效，但不能使用 queueMicrotask
       */
      this.timer = setTimeout(() => {
        this.width = "100%"; //以下是下一句歌词的过渡,继而引发下一次过渡结束，如此循环
        this.transname = "width";
        if (this.steptime[0] == 0) {
          //区分第一句歌词是否以零秒开头
          this.ms = this.steptime[this.index + 1] - this.steptime[this.index];
        } else {
          this.ms = this.steptime[this.index] - this.steptime[this.index - 1];
        }
      }, 1);
    },
    reset() {
      //重新初始化下一首歌的歌词
      this.showtext = this.lyric[0]; //显示第一句歌词
      this.transname = "none";
      this.width = "0";
      this.index = 0;
      // this.ms = 0;
      this.remaintime = -1;
      if (this.timer) {
        clearTimeout(this.timer);
      }
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
