<template>
  <div class="playctrl">
    <div class="basic-info">
      <img :src="song.picUrl" alt="logo" />
      <div class="b-ri">
        <p>
          <span>{{ song.name }}</span>
          <i class="custom-icon custom-icon-heart1"></i>
          <i
            v-if="rawstart !== '00:00'"
            class="custom-icon custom-icon-vip"
          ></i>
        </p>
        <p>{{ song.author }}</p>
      </div>
    </div>
    <audio
      ref="music"
      :src="mp3url"
      @canplay.once="$refs.music.currentTime = vipstart"
      @ended="play = false"
      @timeupdate="play ? update() : null"
    >
      <!-- 动态绑定方法时加上调用括号 -->
    </audio>
    <div class="t-ctrl">
      <div>
        <span @click="modeChange">
          <i
            class="custom-icon"
            :class="mode == 0 ? 'custom-icon-exe-random' : 'custom-icon-order'"
          ></i>
        </span>
        <span @click="next(true)">
          <i class="custom-icon custom-icon-previous"></i>
        </span>
        <span @click="playAndStop">
          <i
            class="custom-icon"
            :class="play ? 'custom-icon-pause' : 'custom-icon-play'"
          >
          </i>
        </span>
        <span @click="next(false)"
          ><i class="custom-icon custom-icon-start"></i
        ></span>
      </div>
      <div ref="pro" @mouseup="restPlay">
        <p
          :class="addtran ? 'tran' : ''"
          :style="{
            width: past + 'px',
          }"
        ></p>
        <span
          class="dot"
          :class="addtran ? 'tran' : ''"
          :style="{ left: sleft + 'px' }"
          @mousedown="addMove"
          @mouseup="cancelMove"
        ></span>
      </div>
      <span class="l-time">{{ starts }}</span>
      <span class="r-time">{{ timeTrans(song.dt, true) }}</span>
    </div>
    <div class="r-content">
      <i class="custom-icon custom-icon-laba"></i>
      <i class="custom-icon custom-icon-sub" @click="subVol"></i>
      <i class="custom-icon custom-icon-plus" @click="addVol"></i>
      <span @click="lyricshow = !lyricshow">词</span>
    </div>
    <i class="custom-icon custom-icon--back"></i>
    <Lyrics :show="lyricshow" :id="song.id" />
  </div>
</template>

<script>
import { getMp3Url } from "@/api/like/like.js";
import { mapState, mapGetters, mapActions } from "vuex";
import Lyrics from "@/components/util/lyrics";
import Bus from "@/assets/bus.js";

export default {
  name: "playcontrol",
  components: {
    Lyrics,
  },
  data() {
    return {
      past: 0,
      sleft: -4,
      addtran: false,
      mp3url: "",
      play: false,
      song: {},
      rawstart: "00:00",
      starts: "00:00",
      mode: 0,
      index: -1,
      vipstart: 0,
      vipend: 0,
      lyricshow: false,
    };
  },
  computed: {
    ...mapState(["playlist"]),
    ...mapGetters(["len"]),
  },
  mounted() {
    this.getLoveMusic()
      .then(() => {
        this.index = this.randomIndex();
        this.song = this.playlist[this.index];
        return getMp3Url(this.song.id);
      })
      .then((res) => {
        if (res.url) {
          this.mp3url = res.url;
          if (res.start) {
            this.starts = this.timeTrans(res.start, false);
            this.rawstart = this.starts;
            let r = ((res.start * 1000) / this.song.dt).toPrecision(2);
            this.past = Number(r) * 400;
            this.sleft = this.past - 4;
          } else {
            this.starts = "00:00";
            this.past = 0;
            this.sleft = -4;
          }
        } else {
          this.next(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    ...mapActions(["getLoveMusic"]),
    restPlay(e) {
      this.addtran = true; //改变播放按钮样式
      const rate = (e.offsetX / 400).toPrecision(2); //获取点击处偏移与进度条总长比值
      this.$refs.music.currentTime = (this.song.dt / 1000) * rate; //设置时间
      this.past = e.offsetX; //更新已播放进度条长度
      this.sleft = e.offsetX - 4; //更新指示点位置
    },
    playAndStop() {
      if (!this.play) {
        //当前处于暂停状态，则播放
        this.$refs.music.play();
        this.play = true;
      } else {
        this.$refs.music.pause();
        this.play = false;
      }
      Bus.$emit("pauseOrPlay", this.play);
    },
    addMove(e) {
      //鼠标按下事件
      this.play = false;
      this.addtran = false;
      this.$refs.music.pause(); //点击指示点时，应暂停音乐
      this.$refs.pro.addEventListener("mousemove", this.drag); //添加 mousemove事件
    },
    cancelMove(e) {
      //鼠标抬起事件
      this.play = true;
      this.$refs.music.play(); //继续播放
      e.stopPropagation(); //阻止冒泡
      this.$refs.pro.removeEventListener("mousemove", this.drag); //移除 mousemove事件
    },
    drag(e) {
      //鼠标点击指示点拖动事件
      const tag = e.target.tagName;
      if (tag == "DIV" || tag == "P") {
        const rate = (e.offsetX / 400).toPrecision(2); //获得当前位置与进度条总长度比值
        this.$refs.music.currentTime = (this.song.dt / 1000) * rate; //更新播放时间
        this.past = e.offsetX; //
        this.sleft = e.offsetX - 4;
      }
    },
    async next(flag) {
      Bus.$emit("nextChange");
      if (this.play) {
        this.$refs.music.pause();
        this.play = false;
      }
      //重置新歌状态
      this.past = 0;
      this.sleft = -4;
      this.vipend = 0;
      this.vipstart = 0;

      if (this.mode == 0) {
        this.index = this.randomIndex();
      } else if (this.mode == 1) {
        if (flag) {
          this.index = this.index - 1 < 0 ? this.len - 1 : this.index - 1;
        } else {
          this.index = this.index + 1 > this.len - 1 ? 0 : this.index + 1;
        }
      }
      let res = await this.uniGetInfo(this.playlist[this.index]);
      if (!res.url) {
        this.next();
      }
    },
    addVol() {
      let vol = this.$refs.music.volume;
      if (vol + 0.1 > 1) {
        vol = 1;
      } else {
        vol = vol + 0.1;
      }
      this.$refs.music.volume = vol;
    },
    subVol() {
      let vol = this.$refs.music.volume;
      if (vol - 0.1 < 0) {
        vol = 0;
      } else {
        vol = vol - 0.1;
      }
      this.$refs.music.volume = vol;
    },
    modeChange() {
      if (this.mode == 0) {
        this.mode = 1;
      } else {
        this.mode = 0;
      }
    },
    update() {
      const sec = Math.trunc(this.song.dt / 1000);
      const rate = Number((this.$refs.music.currentTime / sec).toFixed(2));
      if (this.vipend > 0) {
        const base = Number(
          ((this.vipstart * 1000) / this.song.dt).toPrecision(3)
        );
        this.past = (rate + base) * 400;
        this.sleft = this.past - 4;
      } else {
        this.past = rate * 400;
        this.sleft = this.past - 4;
      }
      this.starts = this.timeTrans(
        this.$refs.music.currentTime + this.vipstart,
        false
      );
    },
    randomIndex() {
      let rand = Math.random();
      let idx = parseInt(rand * this.len);
      return idx;
    },
    timeTrans(dt, isms) {
      let sec = parseInt(dt);
      if (isms) {
        sec = parseInt(dt / 1000);
      }
      let cs = sec % 60;
      let min = Math.trunc(sec / 60);
      if (cs < 10) {
        cs = "0" + cs;
      }
      return "0" + min + ":" + cs;
    },
    async uniGetInfo(song) {
      const songmes = await getMp3Url(song.id);
      let res = {
        url: songmes.url,
      };
      if (songmes.start) {
        res.start = this.timeTrans(songmes.start, false);
      } else {
        res.start = "00:00";
      }
      if (res.url) {
        this.mp3url = res.url;
        this.rawstart = res.start;
        this.starts = res.start;
        this.song = song;
        if (res.start != "00:00") {
          let r = ((songmes.start * 1000) / this.song.dt).toPrecision(2);
          this.past = Number(r) * 400;
          this.sleft = this.past - 4;
          this.vipstart = songmes.start;
          this.vipend = songmes.end;
        }
      }
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
.playctrl {
  width: 100%;
  height: 70px;
  background-color: rgb(136, 134, 134);
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  border-radius: 0 0 4px 4px;
  .basic-info {
    width: 170px;
    display: flex;
    margin-left: 10px;
    margin-right: 30px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
    .b-ri {
      margin-left: 10px;
      p {
        margin-bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:first-child {
          display: flex;
          span {
            display: inline-block;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 4px;
          }
        }
        .custom-icon-heart1 {
          color: rgb(214, 21, 21);
        }
        .custom-icon-vip {
          margin-left: 2px;
          color: rgb(180, 9, 9);
        }
      }
    }
  }
  .t-ctrl {
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-left: 100px;
    // background-color: rgb(77, 69, 69);
    position: relative;
    div:first-child {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      span {
        width: 34px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: background-color 0.4s;
        cursor: pointer;
        &:hover {
          background-color: rgb(27, 26, 26);
        }
      }
      .custom-icon {
        color: rgb(218, 214, 214);
      }
      .custom-icon-loop {
        font-size: 22px;
      }
      .custom-icon-previous {
        font-size: 15px;
      }
      .custom-icon-play {
        font-size: 13px;
      }
      .custom-icon-start {
        font-size: 14px;
      }
      .custom-icon-pause,
      .custom-icon-exe-random,
      .custom-icon-order {
        font-size: 20px;
      }
    }
    div:nth-child(2) {
      width: 400px;
      height: 4px;
      background-color: #fff;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      p {
        width: 50%;
        height: 100%;
        // background-color: rgb(197, 191, 191);
        background-color: rgb(64, 70, 70);
        margin-bottom: 0;
        border-radius: 2px;
      }
      .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: rgb(64, 70, 70);
        position: absolute;
        top: -2px;
      }
      .tran {
        transition: all 0.2s cubic-bezier(0, 1.07, 0.4, 0.97);
      }
    }
    .l-time {
      font-size: 12px;
      position: absolute;
      left: -36px;
      bottom: -1px;
    }
    .r-time {
      font-size: 12px;
      position: absolute;
      right: -40px;
      bottom: -1px;
    }
  }
  .r-content {
    margin-left: 80px;
    .custom-icon {
      margin-right: 10px;
    }
    .custom-icon-laba {
      color: white;
    }
    .custom-icon-sub {
      cursor: pointer;
      color: rgb(99, 90, 90);
    }
    .custom-icon-plus {
      color: black;
      cursor: pointer;
    }
    span {
      cursor: pointer;
      &:hover {
        color: rgb(206, 78, 78);
      }
    }
  }
  .custom-icon--back {
    cursor: pointer;
    margin-left: auto;
    margin-right: 10px;
    font-size: 26px;
  }
}
</style>
