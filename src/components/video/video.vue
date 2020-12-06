<template>
  <div class="video">
    <nav class="film-nav">
      <a
        href="javascript:void 0;"
        :class="isvideo ? 'act-a' : ''"
        @click="isvideo = true"
      >
        视频
      </a>
      <a
        href="javascript:void 0;"
        :class="!isvideo ? 'act-a' : ''"
        @click="isvideo = false"
      >
        MV
      </a>
    </nav>
    <div class="helper" style="position: relative">
      <div class="select">
        <div class="s-left" @click="labelshow = !labelshow">
          <a href="javascript:void 0;">{{ currlabel }}</a>
          <i class="custom-icon custom-icon-Right"></i>
        </div>
        <span
          v-for="(item, index) of showlabel"
          :key="index"
          :class="item.name == currlabel ? 'selected' : ''"
          @click="change(item.name, item.id)"
        >
          {{ item.name }}
        </span>
      </div>
      <label-list
        :alabel="alabel"
        :slabel="currlabel"
        :show="labelshow"
        @update="change"
      ></label-list>
    </div>
    <div class="films-list">
      <div class="films-item" v-for="(item, index) of videos" :key="index">
        <img
          :src="item.coverUrl"
          alt="logo"
          @mouseenter="ri = index"
          v-if="ri != index"
        />
        <img
          :style="{
            objectFit:
              item.height > item.width && item.previewUrl ? 'contain' : 'cover',
          }"
          :src="item.previewUrl ? item.previewUrl : item.coverUrl"
          alt="logo"
          @mouseleave="ri = -1"
          v-else-if="ri == index"
        />
        <p>{{ item.title }}</p>
        <p>by {{ item.nickname }}</p>
        <div class="s-f right-up">
          <i class="custom-icon custom-icon-play2"></i>
          <span>{{ playtime[index] }}</span>
        </div>
        <span class="s-f right-bottom">{{ duration[index] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getVideoLabel,
  getVideoKind,
  getVideoLists,
} from "@/api/films/video.js";
import LabelList from "@/components/video/label";

export default {
  name: "films",
  components: {
    LabelList,
  },
  data() {
    return {
      isvideo: true,
      labelshow: false,
      currlabel: null,
      alabel: [],
      showlabel: [],
      videos: [],
      ri: -1,
    };
  },
  computed: {
    playtime() {
      return this.videos.map((item) => {
        if (item.playTime > 10000) {
          let t = Math.trunc(item.playTime / 10000);
          return t + "万";
        } else {
          return item.playTime;
        }
      });
    },
    duration() {
      return this.videos.map((item) => {
        const sec = Math.trunc(item.durationms / 1000);
        const min = Math.trunc(sec / 60);
        const restsec = sec % 60;
        return min + ":" + restsec;
      });
    },
  },
  created() {
    Promise.all([getVideoLabel(), getVideoKind(), getVideoLists(70000)]).then(
      (res) => {
        [this.alabel, this.showlabel, this.videos] = [...res];
        this.currlabel = this.alabel[0].name;
      }
    );
  },
  methods: {
    change(name, id) {
      this.currlabel = name;
      getVideoLists(id).then((res) => {
        this.videos = res;
      });
    },
  },
};
</script>

<style lang="scss">
.video {
  height: calc(100% - 56px);
  padding: 0 10px 0 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b2bec3;
    border-radius: 2px;
  }
  .film-nav {
    padding: 5px 0;
    margin-bottom: 20px;
    a {
      display: inline-block;
      padding: 4px 0;
      border-bottom: 3px solid transparent;
      margin-right: 25px;
      color: rgb(104, 95, 95);
      font-size: 20px;
      font-family: "Times New Roman", Times, serif;
      transition: transform 0.1s;
    }
    .act-a {
      border-bottom-color: rgb(187, 27, 27);
      transform: scale(1.05, 1.05); //对行内元素没用
      color: black;
    }
  }
  .helper {
    .select {
      display: flex;
      align-items: center;
      .s-left {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 20px;
        border-radius: 19px;
        border: 1px solid rgb(100, 91, 91);
        cursor: pointer;
        a {
          color: rgb(95, 84, 84);
        }
        .custom-icon-Right {
          font-size: 18px;
          line-height: 1;
        }
      }
      span {
        padding: 2px 10px;
        border-radius: 11px;
        font-size: 12px;
        cursor: pointer;
        margin-right: 5px;
        &:nth-child(2) {
          margin-left: auto;
        }
      }
    }
    .selected {
      background-color: #f0d1d1;
      color: #ec4141;
    }
  }
  .films-list {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .films-item {
      width: 240px;
      position: relative;
      margin-bottom: 20px;
      cursor: pointer;
      &:not(:nth-child(3n)) {
        margin-right: 25px;
      }
      img {
        width: 240px;
        height: 140px;
        border-radius: 6px;
        margin-bottom: 10px;
      }
      .s-f {
        position: absolute;
        right: 10px;
      }
      .right-up {
        top: 4px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: white;
        .custom-icon {
          font-size: 12px;
        }
      }
      .right-bottom {
        top: 120px;
      }
    }
    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0;
      overflow: hidden;
      &:nth-child(2) {
        color: rgb(27, 25, 25);
      }
      &:nth-child(3) {
        font-size: 12px;
        color: rgb(177, 171, 171);
      }
    }
  }
}
</style>