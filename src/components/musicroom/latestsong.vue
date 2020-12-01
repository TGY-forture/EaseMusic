<template>
  <div class="latest-page">
    <div class="dif-sel">
      <span :class="change ? 'bghover' : 'bgselect'" @click="change = false"
        >新歌速递
      </span>
      <span :class="change ? 'bgselect' : 'bghover'" @click="change = true"
        >新碟上架
      </span>
    </div>
    <nav class="s-menu">
      <div class="series">
        <span v-for="(item, index) of label" :key="index">
          {{ item }}
        </span>
      </div>
      <span class="d-span same"
        ><i class="custom-icon custom-icon-player"></i> 播放全部</span
      >
      <span class="s-span same"
        ><i class="custom-icon custom-icon-file-add"></i> 收藏全部</span
      >
    </nav>
    <ul class="song-ul">
      <li v-for="(item, index) of songLists" :key="index">
        <span class="sub-f">{{ index + 1 }}</span>
        <div style="position: relative">
          <img :src="item.picUrl" alt="logo" />
          <i class="custom-icon custom-icon-play3"></i>
        </div>
        <p>
          <span>{{ item.name }}</span>
          <span v-if="item.alias">{{ item.alias }}</span>
          <i class="custom-icon custom-icon-sq"></i>
          <i
            class="custom-icon custom-icon-MV"
            v-if="item.mvid == 0 ? false : true"
          ></i>
        </p>
        <span>{{ item.artname }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.duration }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
let label = ["全部", "华语", "欧美", "韩国", "日本"];
export default {
  name: "LatestSong",
  data() {
    return {
      change: false,
      label,
      hsongs: [],
    };
  },
  async created() {
    ({
      data: { data: this.hsongs },
    } = await this.$axios.get("http://localhost:8081/testdata/song.json"));
  },
  computed: {
    songLists() {
      return this.hsongs.map((item) => {
        return {
          picUrl: item.album.picUrl,
          duration: this.parseNum(item.duration),
          name: item.name,
          artname: item.artists[0].name,
          mvid: item.mvid,
          alias: item.alias[0] ? item.alias[0] : "",
        };
      });
    },
  },
  methods: {
    parseNum(num) {
      let pnum = Math.trunc(num / 1000);
      let min = Math.trunc(pnum / 60);
      let sec = pnum % 60;
      return min + ":" + sec;
    },
  },
};
</script>

<style lang="scss">
.latest-page {
  padding: 0 10px 0 20px;
  .dif-sel {
    width: 300px;
    margin: 0 auto;
    border: 1px solid rgb(219, 211, 211);
    border-radius: 17px;
    cursor: default;
    span {
      display: inline-block;
      width: calc(100% / 2);
      padding: 6px 0;
      text-align: center;
      border-radius: 17px;
    }
    .bghover:hover {
      background-color: rgb(238, 234, 234);
    }

    .bgselect {
      background-color: #bbbbbb;
      color: white;
    }
  }
  .s-menu {
    margin-top: 15px;
    display: flex;
    align-items: center;
    .series span {
      margin-right: 20px;
      cursor: pointer;
    }
    .same {
      padding: 2px 10px 0 10px;
      margin-right: 5px;
      border-radius: 14px;
      cursor: pointer;
      .custom-icon {
        vertical-align: middle;
      }
    }
    .d-span {
      color: white;
      margin-left: auto;
      background-color: red;
    }
    .s-span {
      background-color: rgb(221, 211, 211);
    }
  }
  .song-ul {
    margin-top: 15px;
    li {
      display: flex;
      align-items: center;
      padding: 8px 0;
      cursor: default;
      &:nth-child(odd) {
        background-color: rgb(241, 238, 238);
      }
      &:active {
        background-color: rgb(223, 219, 219);
      }
      div {
        .custom-icon-play3 {
          position: absolute;
          top: 30%;
          left: 34%;
        }
        img {
          width: 60px;
          height: 60px;
          border-radius: 4px;
          cursor: pointer;
        }
      }
      .sub-f {
        text-align: center;
        width: 25px;
        margin-right: 12px;
      }
      span:nth-child(4) {
        width: 140px;
        margin-left: 10px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span:nth-child(5) {
        margin-left: 20px;
        width: 140px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span:last-child {
        margin-left: auto;
        margin-right: 5px;
      }
      p {
        width: 280px;
        margin-left: 20px;
        margin-bottom: 0;
        display: flex;
        align-items: center;
        span {
          margin-right: 2px;
          display: inline-block;
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:nth-child(2) {
            color: rgb(168, 163, 163);
          }
        }
        .custom-icon {
          font-size: 20px;
          margin-left: 3px;
        }
        .custom-icon-MV {
          color: #eb3b5a;
          cursor: pointer;
        }
        .custom-icon-sq {
          color: #20bf6b;
        }
      }
    }
  }
}
</style>