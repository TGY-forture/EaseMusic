<template>
  <div class="toplist-page">
    <h2>官方榜</h2>
    <div class="lists">
      <div class="list-single" v-for="(item, index) in topFive" :key="index">
        <div
          style="height: 170px; cursor: pointer"
          @mouseenter="enter(index)"
          @mouseleave="visible = false"
        >
          <img
            :src="index == 4 ? item.coverUrl : item.coverImgUrl"
            alt="logo"
          />
          <div class="updtime">
            <i
              class="custom-icon custom-icon-player"
              :style="{
                visibility: visible && index == ci ? 'visible' : 'hidden',
              }"
            ></i>
            <p>
              {{
                updateTime[index][0] + "月" + updateTime[index][1] + "日"
              }}更新
            </p>
          </div>
        </div>
        <ul>
          <li v-for="(item, sidx) of fiveSongs[index]" :key="sidx">
            <span>{{ sidx + 1 }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.author }}</span>
          </li>
          <li>
            <span>查看更多</span><i class="custom-icon custom-icon-Right"></i>
          </li>
        </ul>
      </div>
    </div>
    <h2>全球榜</h2>
    <div class="global-list">
      <div
        class="helper"
        v-for="(item, index) of restlist"
        :key="index"
        @mouseenter="appear(index)"
        @mouseleave="showplay = false"
        :class="index > 24 ? 'unique' : ''"
      >
        <img :src="item.coverImgUrl" alt="logo" />
        <p>{{ item.name }}</p>
        <div class="right-up">
          <i class="custom-icon custom-icon-play2"></i>
          <span>{{ item.playCount }}</span>
        </div>
        <i
          class="custom-icon custom-icon-play3"
          v-show="showplay && index == ridx"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopList",
  data() {
    return {
      ci: -1,
      ridx: -1,
      showplay: false,
      visible: false,
      list: [],
      artistToplist: {},
      rise: [],
      newsong: [],
      diy: [],
      hotsong: [],
      artists: [],
    };
  },
  async created() {
    let {
      data: { list, artistToplist },
    } = await this.$axios.get("http://localhost:8081/testdata/toplist.json");
    this.artistToplist = artistToplist;
    this.list = list.map((item) => {
      return {
        name: item.name,
        coverImgUrl: item.coverImgUrl,
        updateTime: item.updateTime,
        playCount: item.playCount,
      };
    });
    this.topFive;
  },
  async beforeCreate() {
    let rise = this.$axios.get("http://localhost:8081/testdata/biaosheng.json");
    let newsong = this.$axios.get("http://localhost:8081/testdata/xinge.json");
    let diy = this.$axios.get("http://localhost:8081/testdata/yuanchuang.json");
    let hotsong = this.$axios.get("http://localhost:8081/testdata/rege.json");
    let songer = this.$axios.get("http://localhost:8081/testdata/artist.json");
    [
      {
        data: {
          playlist: { tracks: this.rise },
        },
      },
      {
        data: {
          playlist: { tracks: this.newsong },
        },
      },
      {
        data: {
          playlist: { tracks: this.diy },
        },
      },
      {
        data: {
          playlist: { tracks: this.hotsong },
        },
      },
      {
        data: {
          list: { artists: this.artists },
        },
      },
    ] = await Promise.all([rise, newsong, diy, hotsong, songer]);
  },
  computed: {
    topFive() {
      let tarr = [
        "云音乐飙升榜",
        "云音乐新歌榜",
        "网易原创歌曲榜",
        "云音乐热歌榜",
      ];
      let res = [];
      for (let item of this.list) {
        if (tarr.includes(item.name)) {
          res.push(item);
          if (res.length == 4) break;
        }
      }
      res.push({
        name: this.artistToplist.name,
        coverUrl: this.artistToplist.coverUrl,
      });
      return res;
    },
    fiveSongs() {
      let tl = [this.rise, this.newsong, this.diy, this.hotsong];
      let narr = tl.map((item) => {
        return item.slice(0, 5).map((el) => {
          return { name: el.name, author: el.ar[0].name };
        });
      });
      let art = this.artists.slice(0, 5).map((item) => {
        return { name: item.name };
      });
      narr.push(art);
      return narr;
    },
    updateTime() {
      let sdat = this.topFive.slice(0, 4);
      sdat.push({ updateTime: Date.now() });
      let time = sdat.map((item) => {
        let t = new Date(item.updateTime);
        return [t.getMonth(), t.getDate()];
      });
      return time;
    },
    restlist() {
      let res = [];
      for (let i = 4; i < this.list.length; i++) {
        res.push({
          playCount: this.list[i].playCount,
          name: this.list[i].name,
          coverImgUrl: this.list[i].coverImgUrl,
        });
      }
      return res;
    },
  },
  methods: {
    enter(i) {
      this.ci = i;
      this.visible = true;
    },
    appear(r) {
      this.ridx = r;
      this.showplay = true;
    },
  },
};
</script>

<style lang="scss">
.toplist-page {
  padding-left: 20px;
  padding-right: 10px;
  h2 {
    font-weight: bold;
  }
  .lists {
    .list-single {
      display: flex;
      position: relative;
      margin-bottom: 10px;
      ul {
        margin-bottom: 0;
        width: calc(100% - 170px);
        padding: 0 30px;
        li:not(:last-child) {
          display: flex;
          padding: 6px;
          border-radius: 4px;
          cursor: default;
          span:nth-child(1) {
            margin-right: 5px;
          }
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            span:first-child {
              color: rgb(219, 29, 29);
            }
          }
          &:nth-child(2n + 1) {
            background-color: #ececec;
          }
          &:hover {
            background-color: #dddddd;
          }
          span:last-child {
            margin-left: auto;
          }
        }
        li:last-child {
          margin: 10px 0;
          display: inline-block;
          cursor: pointer;
          &:hover {
            color: black;
          }
          span {
            font-size: 12px;
          }
          .custom-icon {
            vertical-align: middle;
          }
        }
      }
      img {
        width: 170px;
        height: 170px;
        border-radius: 6px;
      }
      .updtime {
        position: absolute;
        top: 45px;
        left: 45px;
        text-align: center;
        .custom-icon-player {
          font-size: 40px;
          color: rgb(179, 49, 49);
        }
      }
    }
  }
  .global-list {
    display: flex;
    flex-wrap: wrap;
    .helper {
      position: relative;
      &:not(:nth-child(5n)) {
        margin-right: 18px;
      }
      img {
        width: 140px;
        height: 140px;
        border-radius: 6px;
        cursor: pointer;
      }
      .right-up {
        position: absolute;
        top: 4px;
        right: 10px;
        color: white;
        .custom-icon-play2 {
          font-size: 12px;
        }
      }
      p {
        width: 140px;
      }
      .custom-icon-play3 {
        position: absolute;
        font-size: 35px;
        top: 25%;
        left: 40%;
      }
    }
  }
}
</style>