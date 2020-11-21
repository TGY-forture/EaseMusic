<template>
  <div class="musicroom">
    <h1>音乐馆</h1>
    <div class="category">
      <a href="#" v-for="(item, index) in category" :key="index">
        {{ item }}
      </a>
    </div>
    <Banner />
    <div class="recommand">
      <h2>推荐歌单</h2>
      <i class="custom-icon custom-icon-Right"></i>
    </div>
    <div class="recommand-list">
      <div class="rec-item">
        <div class="everyday">
          <img
            src="http://p1.music.126.net/4DpSgAVpJny4Ewf-Xw_WQQ==/109951163986641971.jpg"
            alt="logo"
          />
          <p>21</p>
          <i class="custom-icon custom-icon-play3"></i>
        </div>
        <p>每日歌曲推荐</p>
      </div>
      <div class="rec-item" v-for="(item, index) in photo" :key="index">
        <div class="pic-index">
          <img :src="item.picUrl" alt="logo" />
          <div class="u-playcnt">
            <i class="custom-icon custom-icon-play2"></i>
            <span>{{ item.playCount }}</span>
          </div>
          <i class="custom-icon custom-icon-play3"></i>
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/util/banner";
let category = ["每日推荐", "歌单", "电台", "排行榜", "直播", "最新音乐"];
export default {
  name: "MusicRoom",
  data() {
    return {
      category,
      recdata: [],
      // photo: [],
    };
  },
  components: {
    Banner,
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
  },
  mounted() {
    this.getMusicUnits();
  },
  methods: {
    async getMusicUnits() {
      ({
        data: { result: this.recdata },
      } = await this.$axios.get("http://localhost:8081/testdata/catory.json"));
    },
  },
};
</script>

<style lang="scss">
.musicroom {
  height: calc(100% - 56px);
  overflow-y: scroll;
  // overflow-x: hidden;
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
  h1 {
    font-weight: bold;
  }
  .category {
    margin-bottom: 20px;
    a {
      color: grey;
      font-size: 16px;
      margin-right: 26px;
      padding: 6px 0;
      border-radius: 0 0 1px 1px;
      transition: transform 0.1s;
      display: inline-block;
      font-family: "Courier New", Courier, monospace;
      &:hover {
        // border-bottom: 3px solid rgb(218, 13, 13);
        transform: scale(1.2, 1.2);
      }
    }
  }
  .recommand {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 10px 0;
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
    .rec-item {
      width: 140px;
      margin-bottom: 20px;
      cursor: pointer;
      p {
        margin-bottom: 0;
      }
      .pic-index {
        position: relative;
        img {
          width: 140px;
          height: 140px;
          border-radius: 6px;
        }
        .u-playcnt {
          width: 140px;
          position: absolute;
          top: 4px;
          color: white;
          display: flex;
          align-items: center;
          .custom-icon {
            font-size: 18px;
            margin-left: auto;
            margin-right: 4px;
          }
          span {
            margin-right: 5px;
          }
        }
        .custom-icon-play3 {
          position: absolute;
          line-height: 1;
          font-size: 30px;
          bottom: 10px;
          right: 10px;
        }
      }
      .everyday {
        position: relative;
        border-radius: 6px;
        background-color: #3b6677;
        img {
          width: 140px;
          height: 140px;
          border-radius: 6px;
        }
        .custom-icon-play3 {
          position: absolute;
          line-height: 1;
          font-size: 30px;
          bottom: 10px;
          right: 10px;
        }
        p {
          position: absolute;
          top: 45%;
          left: 42%;
          font-size: 20px;
          font-weight: bold;
          color: #dd001b;
        }
      }
    }
  }
}
</style>