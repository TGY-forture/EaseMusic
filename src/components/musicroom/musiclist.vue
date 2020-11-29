<template>
  <div class="playlist-page">
    <div class="bg-help">
      <div
        class="top"
        :style="{ backgroundImage: `url(${highQuality.coverImgUrl})` }"
      ></div>
      <div class="top-top">
        <img :src="highQuality.coverImgUrl" alt="logo" />
        <div class="descript">
          <div class="hq-entry">
            <i class="custom-icon custom-icon-huangguan"></i>
            <span>精品歌单</span>
          </div>
          <p style="color: white; margin-bottom: 5px">{{ highQuality.name }}</p>
          <p style="color: #bdc3c7; font-size: 14px">
            {{ highQuality.copywriter }}
          </p>
        </div>
      </div>
    </div>
    <nav class="cat-items">
      <button @click="showAndHide">
        {{ highQuality.tag }}<i class="custom-icon custom-icon-Right"></i>
      </button>
      <SeriesSelect
        :visible="showcat"
        :back="showdetail"
        @close="showcat = false"
      />
      <span
        v-for="(name, index) in hotCat"
        :key="index"
        :style="{ marginLeft: index == 0 ? 'auto' : '2px' }"
        :class="index == catidx ? 'select' : ''"
        class="s-conflit"
        @click="change(index)"
      >
        {{ name }}
      </span>
    </nav>
    <div class="single-song">
      <PicList
        v-for="(item, index) in mlist"
        :key="index"
        :src="item.coverImgUrl"
        :width="180"
        :height="180"
        :playcnt="item.playCount"
        :ptext="item.name"
        :djtext="item.nickname"
        :identifyIcon="item.identifyIcon"
        inmlist
      />
    </div>
  </div>
</template>

<script>
import PicList from "@/components/util/piclist";
import SeriesSelect from "@/components/util/seriesselect";
export default {
  name: "MusicList",
  components: {
    PicList,
    SeriesSelect,
  },
  data() {
    return {
      seriesmusic: [],
      tags: [],
      hqsrc: [],
      catidx: 0,
      selectcat: [],
      categories: {},
      showcat: false,
      showdetail: false,
    };
  },
  async created() {
    ({
      data: { tags: this.tags },
    } = await this.$axios.get("http://localhost:8081/testdata/mhotcat.json"));
  },
  async beforeMount() {
    ({
      data: {
        playlists: [this.hqsrc],
      },
    } = await this.$axios.get(
      "http://localhost:8081/testdata/highquality.json"
    ));
  },
  async mounted() {
    ({
      data: { playlists: this.seriesmusic },
    } = await this.$axios.get("http://localhost:8081/testdata/playlist.json"));
  },
  computed: {
    highQuality() {
      return {
        name: this.hqsrc.name,
        coverImgUrl: this.hqsrc.coverImgUrl,
        copywriter: this.hqsrc.copywriter,
        tag: this.hqsrc.tag,
      };
    },
    hotCat() {
      return this.tags.map((item) => {
        return item.name;
      });
    },
    mlist() {
      return this.seriesmusic.map((item) => {
        return {
          name: item.name,
          coverImgUrl: item.coverImgUrl,
          playCount: item.playCount,
          identifyIcon: item.creator.avatarDetail?.identityIconUrl,
          nickname: item.creator.nickname,
        };
      });
    },
  },
  methods: {
    change(i) {
      this.catidx = i;
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