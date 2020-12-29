<template>
  <div class="playlist-page">
    <div class="bg-help">
      <div
        class="top"
        :style="{ backgroundImage: `url(${hQuality[0].coverImgUrl})` }"
      ></div>
      <div class="top-top">
        <img :src="hQuality[0].coverImgUrl" alt="logo" />
        <div class="descript">
          <div class="hq-entry">
            <i class="custom-icon custom-icon-huangguan"></i>
            <span>精品歌单</span>
          </div>
          <p style="color: white; margin-bottom: 5px">
            {{ hQuality[0].name }}
          </p>
          <p style="color: #bdc3c7; font-size: 14px">
            {{ hQuality[0].copywriter }}
          </p>
        </div>
      </div>
    </div>
    <nav class="cat-items">
      <button @click="showAndHide">
        {{ hQuality[0].tag }}<i class="custom-icon custom-icon-Right"></i>
      </button>
      <SeriesSelect
        :visible="showcat"
        :back="showdetail"
        :categories="categories"
        :selectcat="subcat"
        :tag="hQuality[0].tag"
        @close="showcat = false"
        @labelchange="change"
      />
      <span
        v-for="(item, index) in hotlabel"
        :key="index"
        :style="{ marginLeft: index == 0 ? 'auto' : '2px' }"
        :class="item.name == hQuality[0].tag ? 'select' : ''"
        class="s-conflit"
        @click="change(item.name)"
      >
        {{ item.name }}
      </span>
    </nav>
    <div class="single-song">
      <PicList
        v-for="(item, index) in playlists"
        :key="index"
        :src="item.coverImgUrl"
        :width="180"
        :height="180"
        :playcnt="item.playCount"
        :ptext="item.name"
        :djtext="item.nickname"
        :identifyIcon="item.icon"
        inmlist
      />
    </div>
  </div>
</template>

<script>
import PicList from "@/components/util/piclist";
import SeriesSelect from "@/components/util/seriesselect";
import {
  songCategory,
  hotCategory,
  highQuality,
  playLists,
} from "@/api/musicroom/songlist.js";

export default {
  name: "MusicList",
  components: {
    PicList,
    SeriesSelect,
  },
  data() {
    return {
      hQuality: [{}],
      hotlabel: [],
      playlists: [],
      categories: {},
      subcat: [],
      showcat: false,
      showdetail: false,
    };
  },
  async created() {
    Promise.all([
      highQuality("华语"),
      hotCategory(),
      songCategory(),
      playLists("华语"),
    ]).then((res) => {
      [
        this.hQuality,
        this.hotlabel,
        { categories: this.categories, subcat: this.subcat },
        this.playlists,
      ] = [...res];
    });
  },
  methods: {
    change(name) {
      highQuality(name).then((newhquality) => {
        this.hQuality = newhquality;
      });
      playLists(name).then((newlist) => {
        this.playlists = newlist;
      });
    },
    showAndHide() {
      if (!this.showcat) {
        this.showcat = true;
      }
      this.showdetail = !this.showdetail;
    },
  },
};
</script>

<style lang="scss">
.playlist-page {
  padding: 0 10px 0 20px;
  .bg-help {
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
    .top {
      width: 100%;
      height: 180px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      filter: blur(50px) brightness(0.6);
    }
    .top-top {
      position: absolute;
      top: 20px;
      left: 20px;
      display: flex;
      align-items: center;
      img {
        width: 140px;
        height: 140px;
        border-radius: 6px;
      }
      .descript {
        margin-left: 20px;
        .hq-entry {
          display: inline-block;
          text-align: center;
          padding: 0 10px;
          border: 1px solid #a88055;
          border-radius: 21px;
          color: #a88055;
          margin-bottom: 15px;
          .custom-icon-huangguan {
            font-size: 20px;
            vertical-align: middle;
          }
        }
        p {
          margin-bottom: 0;
        }
      }
    }
  }
  .cat-items {
    margin: 20px 0;
    position: relative;
    display: flex;
    align-items: center;
    button {
      width: 120px;
      border-radius: 14px;
      border: 1px solid #bdc3c7;
      outline: none;
      cursor: pointer;
      &:hover {
        background-color: #e0e6eb;
      }
    }
    .s-conflit {
      font-size: 12px;
      display: inline-block;
      padding: 2px 7px;
      border-radius: 11px;
      cursor: pointer;
    }
    .select {
      background-color: #f0d1d1;
      color: #ec4141;
    }
  }
  .single-song {
    display: flex;
    flex-wrap: wrap;
    div:not(:nth-child(4n)) {
      margin-right: 13px;
    }
  }
}
</style>