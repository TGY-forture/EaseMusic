<template>
  <div class="recommand-page">
    <Banner :pictures="banner" />
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
        :date="date"
        ptext="每日歌曲推荐"
        color="#3b6677"
      />
      <PicList
        v-for="(item, index) in dailylist"
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
        v-for="(item, index) of pricontent"
        :key="index"
        :src="item.spicUrl"
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
        <li v-for="(item, index) in newsongs.slice(0, 12)" :key="index">
          <img :src="item.picUrl" alt="logo" />
          <div>
            <p>{{ item.name }}</p>
            <p>
              <i
                class="custom-icon custom-icon-MV"
                v-show="item.mvid != 0 ? true : false"
              ></i>

              <i class="custom-icon custom-icon-sq"></i>
              <span>{{ item.artists }}</span>
            </p>
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
import {
  getReBanner,
  getDailyReList,
  getReDj,
  privateContent,
  getNewSongs,
  getReMv,
} from "@/api/musicroom/recommand.js";
export default {
  name: "Recommand",
  components: {
    Banner,
    PicList,
  },
  data() {
    return {
      date: null,
      banner: [],
      dailylist: [],
      dj: [],
      pricontent: [],
      newsongs: [],
      mv: [],
    };
  },
  created() {
    this.date = new Date().getDate();
    Promise.all([
      getReBanner(),
      getDailyReList(),
      getReDj(),
      privateContent(),
      getNewSongs(),
      getReMv(),
    ]).then((res) => {
      [
        this.banner,
        this.dailylist,
        this.dj,
        this.pricontent,
        this.newsongs,
        this.mv,
      ] = [...res];
    });
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