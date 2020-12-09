<template>
  <div class="playctrl">
    <div class="basic-info">
      <img :src="song.picUrl" alt="logo" />
      <div class="b-ri">
        <p>
          <span>{{ song.name }}</span>
          <i class="custom-icon custom-icon-heart1"></i>
          <i v-if="starts !== '00:00'" class="custom-icon custom-icon-vip"></i>
        </p>
        <p>{{ song.author }}</p>
      </div>
    </div>
    <audio ref="music" :src="mp3url" @ended="play = false"></audio>
    <div class="t-ctrl">
      <div>
        <span><i class="custom-icon custom-icon-loop"></i></span>
        <span @click="previous">
          <i class="custom-icon custom-icon-previous"></i
        ></span>
        <span @click="playAndStop">
          <i
            class="custom-icon"
            :class="play ? 'custom-icon-pause' : 'custom-icon-play'"
          ></i>
        </span>
        <span @click="next"><i class="custom-icon custom-icon-start"></i></span>
        <!-- <i class="custom-icon custom-icon-order"></i> -->
        <!-- <i class="custom-icon custom-icon-exe-random"></i> -->
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
      <span>词</span>
    </div>
    <i class="custom-icon custom-icon--back"></i>
  </div>
</template>

<script>
import { getMp3Url } from "@/api/like/like.js";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "playcontrol",
  data() {
    return {
      past: 0,
      sleft: -4,
      addtran: false,
      mp3url: "",
      play: false,
      song: {},
      starts: "00:00",
    };
  },
  computed: {
    ...mapState(["playlist"]),
    ...mapGetters(["len"]),
  },
  mounted() {
    this.getLoveMusic()
      .then(() => {
        this.song = this.playlist[this.randomIndex()];
        return getMp3Url(this.song.id);
      })
      .then((res) => {
        this.mp3url = res.url;
        if (res.start) {
          this.starts = this.timeTrans(res.start, false);
        } else {
          this.starts = "00:00";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    ...mapActions(["getLoveMusic"]),
    restPlay(e) {
      this.addtran = true;
      this.past = e.offsetX;
      this.sleft = e.offsetX - 4;
    },
    playAndStop() {
      if (!this.play) {
        this.$refs.music.play();
        this.play = true;
      } else {
        this.$refs.music.pause();
        this.play = false;
      }
    },
    addMove(e) {
      this.addtran = false;
      this.$refs.pro.addEventListener("mousemove", this.drag);
    },
    cancelMove(e) {
      e.stopPropagation();
      this.$refs.pro.removeEventListener("mousemove", this.drag);
    },
    drag(e) {
      const tag = e.target.tagName;
      if (tag == "DIV" || tag == "P") {
        this.past = e.offsetX;
        this.sleft = e.offsetX - 4;
      }
    },
    previous() {
      this.song = this.playlist[this.randomIndex()];
      getMp3Url(this.song.id)
        .then((res) => {
          this.mp3url = res.url;
          if (res.start) {
            this.starts = this.timeTrans(res.start, false);
          } else {
            this.starts = "00:00";
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    next() {},
    addVol() {
      let vol = this.$refs.music.volume;
      if (vol + 0.1 > 1) {
        vol = 1;
      } else {
        vol = vol + 0.1;
      }
      this.$refs.music.volume = vol;
      console.log(this.$refs.music.volume);
    },
    subVol() {
      let vol = this.$refs.music.volume;
      if (vol - 0.1 < 0) {
        vol = 0;
      } else {
        vol = vol - 0.1;
      }
      this.$refs.music.volume = vol;
      console.log(this.$refs.music.volume);
    },
    update() {
      console.log(1);
    },
    randomIndex() {
      let rand = Math.random();
      let idx = parseInt(rand * this.len);
      return idx;
    },
    timeTrans(dt, isms) {
      let sec = dt;
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
      .custom-icon-pause {
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
        background-color: rgb(197, 191, 191);
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
      right: -34px;
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