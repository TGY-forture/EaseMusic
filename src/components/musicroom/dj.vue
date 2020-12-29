<template>
  <div class="dj-page">
    <Banner :pictures="banner" />
    <div class="help-layer">
      <i
        class="cus-conflict custom-icon custom-icon-Larrow"
        @click="isScroll = false"
        v-show="isScroll"
      ></i>
      <i
        class="cus-conflict custom-icon custom-icon-Right"
        @click="isScroll = true"
        v-show="!isScroll"
      ></i>
      <div class="help-two" @mousewheel="move">
        <div class="djcate" :style="{ left: isScroll ? '-600px' : 0 }">
          <div class="dj-item">
            <div>
              <i class="custom-icon custom-icon-toolsbar"></i>
            </div>
            <p>排行榜</p>
          </div>
          <div class="dj-item" v-for="(item, index) in djcate" :key="index">
            <div>
              <img :src="item.pic56x56Url" alt="logo" />
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-select">
      <h2>付费精品</h2>
      <i class="custom-icon custom-icon-Right"></i>
    </div>
    <div class="pay-list">
      <div class="pay-list-item" v-for="(item, index) in highQual" :key="index">
        <img :src="item.picUrl" alt="logo" />
        <div class="list-item-right">
          <p>{{ item.name }}</p>
          <p>{{ item.rcmdText }}</p>
          <p>
            <i class="custom-icon custom-icon-play2"></i>
            <span> {{ item.lastProgramName }}</span>
          </p>
          <i class="custom-icon custom-icon-rmb"></i>
          <span> {{ item.originalPrice / 100 + "/期" }}</span>
        </div>
      </div>
    </div>
    <div class="pay-select">
      <h2>个性推荐</h2>
      <i class="custom-icon custom-icon-Right"></i>
    </div>
    <div class="dj-cus">
      <PicList
        v-for="(item, index) of redj"
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
import PicList from "@/components/util/piclist";
import Banner from "@/components/util/banner";
import { djBanner, djCategories, payHighQual } from "@/api/musicroom/dj.js";
import { getReDj } from "@/api/musicroom/recommand.js";
export default {
  name: "Dj",
  components: {
    Banner,
    PicList,
  },
  data() {
    return {
      banner: [],
      djcate: [],
      highQual: [],
      redj: [],
      isScroll: false,
    };
  },
  created() {
    Promise.all([djBanner(), djCategories(), payHighQual(), getReDj()]).then(
      (res) => {
        [this.banner, this.djcate, this.highQual, this.redj] = [...res];
      }
    );
  },
  methods: {
    move(e) {
      e.preventDefault();
      let delta = e.wheelDelta;
      // let cname = e.target.className;
      // if (cname == "djcate") {
      if (delta < 0) {
        this.isScroll = true;
      } else if (delta > 0) {
        this.isScroll = false;
      }
      // }
    },
  },
};
</script>

<style lang="scss">
.dj-page {
  padding: 0 10px 0 20px;
  .help-layer {
    position: relative;
    margin: 25px auto 20px;
    width: 680px;
    .cus-conflict {
      position: absolute;
      top: 5px;
      font-size: 40px;
      color: rgb(214, 198, 198);
      cursor: pointer;
    }
    .custom-icon-Larrow {
      left: -34px;
    }
    .custom-icon-Right {
      right: -34px;
    }
    .help-two {
      overflow-x: hidden;
      .djcate {
        width: 1200px;
        position: relative;
        display: flex;
        transition: left 1s;
        .dj-item {
          margin-left: 6px;
          margin-right: 30px;
          div {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background-color: #fad8d8;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:hover {
              background-color: #eec8c8;
            }
            img {
              width: 32px;
              height: 32px;
            }
          }
          p {
            margin-bottom: 0;
            font-size: 12px;
            text-align: center;
          }
          .custom-icon-toolsbar {
            font-size: 32px;
            color: #ec4141;
          }
        }
      }
    }
  }
  .pay-select {
    display: flex;
    align-items: center;
    line-height: 1;
    cursor: pointer;
    h2 {
      font-weight: bold;
      margin-bottom: 0;
    }
    .custom-icon-Right {
      font-size: 32px;
    }
  }
  .pay-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .pay-list-item {
      width: 350px;
      display: flex;
      align-items: center;
      margin-top: 15px;
      // background-color: grey;
      img {
        width: 140px;
        height: 140px;
        border-radius: 6px;
      }
      .list-item-right {
        margin-left: 5px;
        p {
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:nth-child(2),
          &:nth-child(3) {
            margin-bottom: 0;
          }
        }
        .custom-icon-rmb {
          color: red;
        }
        .custom-icon-play2 {
          font-size: 12px;
        }
      }
    }
  }
  .dj-cus {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 15px;
  }
}
</style>