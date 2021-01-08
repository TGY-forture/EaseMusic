<template>
  <div class="like">
    <div class="top">
      <img :src="songinfo.coverImgUrl" alt="logo" />
      <div>
        <span class="list-uni">歌单</span>
        <span class="title">我喜欢的音乐</span>
        <p class="u-info">
          <img :src="songinfo.avatarUrl" alt="logo" />
          <span>{{ songinfo.nickname }}</span>
          <span>{{ createTime }}创建</span>
        </p>
        <div class="util-btn">
          <Box
            color="red"
            textcolor="white"
            add
            iconclass="custom-icon-play2"
            content="播放全部"
          >
            <template v-slot:suffix>
              <i class="custom-icon custom-icon-plus"></i>
            </template>
          </Box>
          <Box iconclass="custom-icon-file-add" content="收藏全部"></Box>
          <Box iconclass="custom-icon-share" content="分享"></Box>
          <Box iconclass="custom-icon-download" content="下载全部"></Box>
        </div>
        <p class="song-detail">
          <span>歌曲:{{ songinfo.trackCount }}</span>
          <span>播放:{{ songinfo.playCount }}</span>
        </p>
      </div>
    </div>
    <main class="like-m">
      <p>歌曲列表</p>
      <ul>
        <li>
          <p></p>
          <p>音乐标题</p>
          <p>歌手</p>
          <p>专辑</p>
          <p>时长</p>
        </li>
        <li v-for="(item, index) in likesongs" :key="index">
          <p>
            <span>{{ index + 1 }}</span>
            <i class="custom-icon custom-icon-heart1"></i>
            <i class="custom-icon custom-icon-download"></i>
          </p>
          <p>
            {{ item.name }}
            <i v-if="item.mv != 0" class="custom-icon custom-icon-MV"></i>
          </p>
          <p>{{ item.author }}</p>
          <p>{{ item.al }}</p>
          <p>{{ time(item.dt) }}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import {
  getLikes,
  getLists,
  getSongDetail,
  getMp3Url,
} from "@/api/like/like.js";
import Box from "@/components/like/box";
export default {
  name: "like",
  components: {
    Box,
  },
  data() {
    return {
      songinfo: {},
      likesongs: [],
    };
  },
  computed: {
    createTime() {
      const ctime = new Date(this.songinfo.createTime);
      return (
        ctime.getFullYear() +
        "-" +
        (ctime.getMonth() + 1) +
        "-" +
        ctime.getDate()
      );
    },
  },
  created() {
    getLists(this.$store.state.uid).then((res) => {
      this.songinfo = res[0];
    });
  },
  beforeMount() {
    getLikes(this.$store.state.uid)
      .then((ids) => {
        return getSongDetail(ids.slice(0, 50).join(","));
      })
      .then((res) => {
        this.likesongs = res;
      });
  },
  methods: {
    time(dt) {
      dt = Math.trunc(dt / 1000);
      const sec = dt % 60;
      const min = Math.trunc(dt / 60);
      return min + ":" + sec;
    },
  },
};
</script>

<style lang="scss">
.like {
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
  .top {
    display: flex;
    & > img {
      width: 200px;
      height: 200px;
      border-radius: 6px;
    }
    & > div {
      margin-left: 20px;
      padding-top: 10px;
      .list-uni {
        border: 1px solid rgb(233, 9, 9);
        color: rgb(233, 9, 9);
        padding: 1px 3px;
        border-radius: 3px;
      }
      .title {
        margin-left: 7px;
        font-size: 22px;
        font-weight: bold;
        vertical-align: -1px;
      }
      .u-info {
        margin-top: 10px;
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 5px;
        }
        span:nth-child(2) {
          margin-right: 10px;
        }
      }
      .util-btn {
        display: flex;
      }
      .song-detail {
        margin-top: 10px;
        span {
          margin-right: 15px;
        }
      }
    }
  }
  .like-m {
    margin-top: 15px;
    & > p {
      display: inline-block;
      font-weight: bold;
      font-size: 15px;
      margin-bottom: 0;
      padding-bottom: 4px;
      border-bottom: 3px solid red;
    }
    ul {
      margin-bottom: 0;
      li {
        display: flex;
        margin-bottom: 5px;
        &:first-child p {
          &:hover {
            cursor: default;
          }
          &:not(:first-child):hover {
            background-color: rgb(228, 222, 222);
          }
        }
        &:nth-child(even) {
          background-color: rgb(241, 235, 235);
        }
        p {
          padding: 4px 0;
          margin-bottom: 0;
          &:first-child {
            width: 120px;
            padding: 0 20px;
            align-items: center;
            justify-content: space-around;
            display: flex;
            span:first-child {
              width: 26px;
            }
            .custom-icon-heart1 {
              color: red;
            }
          }
          &:not(:first-child) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:nth-child(2) {
            width: 280px;
            .custom-icon-MV {
              color: red;
            }
          }
          &:nth-child(3) {
            width: 140px;
          }
          &:nth-child(4) {
            width: 180px;
          }
          &:nth-child(5) {
            width: calc(774px - 720px);
          }
        }
      }
    }
  }
}
</style>