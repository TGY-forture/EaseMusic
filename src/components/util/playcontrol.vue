<template>
  <div class="playctrl" @click="pro">
    <div class="basic-info">
      <img :src="song.picUrl" alt="logo" />
      <div class="b-ri">
        <p>
          <span>{{ song.name }}</span>
          <i class="custom-icon custom-icon-heart1"></i>
        </p>
        <p>{{ song.author }}</p>
      </div>
    </div>
    <div class="t-ctrl">
      <div class="s-btn">
        <i class="custom-icon custom-icon-previous"></i>
        <i class="custom-icon custom-icon-loop"></i>
        <i class="custom-icon custom-icon-play"></i>
        <!-- <i class="custom-icon custom-icon-order"></i>
        <i class="custom-icon custom-icon-exe-random"></i> -->
        <i class="custom-icon custom-icon-start"></i>
        <i class="custom-icon custom-icon-pause"></i>
      </div>
      <div class="progress">
        <p></p>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
// http://m8.music.126.net/20201208110126/4f1a1cce4cdae6eee3a7c02cb0245139/ymusic/525b/525e/0e58/e14ac6b79fe4436c5b4192b58cc720bc.mp3
import { mapState } from "vuex";
export default {
  name: "playcontrol",
  data() {
    return {
      v: 1,
    };
  },
  computed: {
    ...mapState(["song"]),
  },
  methods: {
    pro() {
      console.log(this.v++);
    },
  },
};
</script>

<style lang="scss" scoped>
.playctrl {
  width: 100%;
  height: 70px;
  background-color: grey;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  .basic-info {
    display: flex;
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
          width: 110px;
        }
        span {
          margin-right: 4px;
        }
        .custom-icon-heart1 {
          color: rgb(214, 21, 21);
        }
      }
    }
  }
  .t-ctrl {
    background-color: rgb(77, 69, 69);
    div:nth-child(2) {
      width: 400px;
      height: 4px;
      background-color: #fff;
      position: relative;
      p {
        width: 50%;
        height: 100%;
        background-color: red;
        margin-bottom: 0;
      }
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: blue;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>