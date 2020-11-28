<template>
  <div class="recommand-page">
    <Banner />
    <div class="recommand">
      <h2>推荐歌单</h2>
      <i class="custom-icon custom-icon-Right"></i>
    </div>
    <div class="recommand-list">
      <PicList
        src="http://p1.music.126.net/4DpSgAVpJny4Ewf-Xw_WQQ==/109951163986641971.jpg"
        :width="140"
        :height="140"
        :rightUp="false"
        date="25"
        ptext="每日歌曲推荐"
        color="#3b6677"
      />
      <PicList
        v-for="(item, index) in photo"
        :key="index"
        :src="item.picUrl"
        :width="140"
        :height="140"
        :playcnt="item.playCount"
        :ptext="item.name"
      />
    </div>
    <div class="recommand">
      <h2>独家放送</h2>
      <i class="custom-icon custom-icon-Right"></i>
    </div>
    <div class="recommand-list">
      <PicList
        v-for="(item, index) of playdata"
        :key="index"
        :src="item.sPicUrl"
        :width="240"
        :height="135"
        :rightUp="false"
        :leftUpIcon="true"
        :rightDownIcon="false"
        :ptext="item.name"
      />
    </div>
    <div class="recommand">
      <h2>最新音乐</h2>
      <i class="custom-icon custom-icon-Right"></i>
    </div>
    <div class="new-music">
      <ul>
        <li v-for="(item, index) in newList" :key="index">
          <img :src="item.picUrl" alt="logo" />
          <div>
            <p>{{ item.name }}</p>
            <i
              class="custom-icon custom-icon-MV"
              v-show="item.mvid != 0 ? true : false"
            ></i>
            <i class="custom-icon custom-icon-sq"></i>
            <span>{{ item.artist }}</span>
          </div>
          <i class="custom-icon custom-icon-play3"></i>
        </li>
      </ul>
    </div>
    <div class="recommand">
      <h2>推荐MV</h2>
      <i class="custom-icon custom-icon-Right"></i>
    </div>
    <div class="recommand-list">
      <PicList
        v-for="(item, index) of mv"
        :key="index"
        :src="item.picUrl"
        :width="240"
        :height="135"
        :rightDownIcon="false"
        :playcnt="item.playCount"
        :ptext="item.name"
        :artist="item.artistName"
      />
    </div>
    <div class="recommand">
      <h2>主播电台</h2>
      <i class="custom-icon custom-icon-Right"> </i>
    </div>
    <div class="recommand-list">
      <PicList
        v-for="(item, index) of dj"
        :key="index"
        :src="item.picUrl"
        :width="140"
        :height="140"
        :rightUp="false"
        :rightDownIcon="false"
        :djtext="item.name"
        :ptext="item.rcmdtext"
      />
    </div>
  </div>
</template>

<script>
import Banner from "@/components/util/banner";
import PicList from "@/components/util/piclist";
export default {
  name: "Recommand",
  components: {
    Banner,
    PicList,
  },
  data() {
    return {
      recdata: [],
      singledata: [],
      newsong: [],
      recmv: [],
      recdj: [],
    };
  },
  computed: {
    photo() {
      return this.recdata.slice(0, 9).map((item) => {
        return {
          id: item.id,
          picUrl: item.picUrl,
          name: item.name,
          playCount: item.playCount,
        };
      });
    },
    playdata() {
      let t = this.singledata.map((item) => {
        return {
          sPicUrl: item.sPicUrl,
          name: item.name,
          id: item.id,
        };
      });
      return t;
    },
    newList() {
      let ret = [];
      if (this.newsong.length == 0) return [];
      for (let i = 0; i < 12; i++) {
        ret.push({
          id: this.newsong[i].id,
          name: this.newsong[i].name,
          picUrl: this.newsong[i].picUrl,
          artist: this.newsong[i].song.artists[0].name,
          transName: this.newsong[i].song.transName,
          mvid: this.newsong[i].song.mvid,
        });
      }
      return ret;
    },
    mv() {
      let res = [];
      if (this.recmv.length == 0) return [];
      for (let i = 0; i < 3; i++) {
        res.push({
          id: this.recmv[i].id,
          name: this.recmv[i].name,
          copywriter: this.recmv[i].copywriter,
          picUrl: this.recmv[i].picUrl,
          playCount: this.recmv[i].playCount,
          artistName: this.recmv[i].artistName,
        });
      }
      return res;
    },
    dj() {
      return this.recdj.map((item) => {
        return {
          name: item.name,
          picUrl: item.picUrl,
          rcmdtext: item.rcmdtext,
        };
      });
    },
  },
  mounted() {
    this.getMusicUnits();
  },
  methods: {
    async getMusicUnits() {
      let p1 = this.$axios.get("http://localhost:8081/testdata/catory.json");
      let p2 = this.$axios.get("http://localhost:8081/testdata/alone.json");
      let p3 = this.$axios.get("http://localhost:8081/testdata/newsong.json");
      let p4 = this.$axios.get("http://localhost:8081/testdata/remv.json");
      let p5 = this.$axios.get("http://localhost:8081/testdata/redj.json");
      Promise.all([p1, p2, p3, p4, p5]).then((res) => {
        [
          {
            data: { result: this.recdata },
          },
          {
            data: { result: this.singledata },
          },
          {
            data: { result: this.newsong },
          },
          {
            data: { result: this.recmv },
          },
          {
            data: { data: this.recdj },
          },
        ] = res;
      });
    },
  },
};
</script>

<style lang="scss">
.recommand-page {
  .recommand {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 10px 0 10px 20px;
    cursor: pointer;
    h2 {
      font-weight: bold;
      margin-bottom: 0;
    }
    .custom-icon-Right {
      font-size: 32px;
    }
  }
  .recommand-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 10px;
    margin-left: 20px;
  }
  .new-music {
    margin-left: 20px;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 240px;
        display: flex;
        position: relative;
        align-items: center;
        margin-bottom: 15px;
        border-radius: 5px;
        &:hover {
          background-color: #eaeaea;
        }
        p {
          margin-bottom: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
          cursor: pointer;
        }
        div {
          width: 180px;
          height: 50px;
          margin-left: 5px;
          .custom-icon-sq {
            color: #eb3b5a;
            margin-left: 4px;
            cursor: default;
          }
          .custom-icon-MV {
            color: #20bf6b;
          }
          span {
            margin-left: 4px;
            cursor: pointer;
          }
        }
        .custom-icon {
          font-size: 22px;
          vertical-align: middle;
          cursor: pointer;
        }
        .custom-icon-play3 {
          position: absolute;
          top: 13px;
          left: 14px;
        }
      }
    }
  }
}
</style>