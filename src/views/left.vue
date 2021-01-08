<template>
  <div class="left-view">
    <header>
      <i
        class="custom-icon custom-icon-fanqiezhuanzhuwu-shouye-fanqiezhong"
      ></i>
      <span class="webfont">DO音乐</span>
    </header>
    <section class="online-m">
      <p>在线音乐</p>
      <ul>
        <router-link
          :to="item.path"
          tag="li"
          v-for="(item, index) in onlinelist"
          :key="index"
          exact
          exact-active-class="top-active"
        >
          <i :class="['custom-icon', item.classname]"></i>
          <span>{{ item.text }}</span>
        </router-link>
      </ul>
    </section>
    <section class="mymusic">
      <p>我的音乐</p>
      <ul>
        <router-link
          :to="item.path"
          tag="li"
          v-for="(item, index) in mymusic"
          :key="index"
          exact
          exact-active-class="top-active"
        >
          <i :class="['custom-icon', item.classname]"></i>
          <span>{{ item.text }}</span>
        </router-link>
      </ul>
    </section>
    <section class="mylist">
      <p>我的歌单</p>
      <ul>
        <router-link to="/like" tag="li" exact exact-active-class="top-active">
          <i class="custom-icon custom-icon-heart-copy-copy"></i>
          <span>我喜欢</span>
          <i
            class="custom-icon custom-icon-heart"
            style="margin-left: auto"
          ></i>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
let onlinelist = [
  {
    text: "音乐馆",
    classname: "custom-icon-music",
    path: "/musicroom",
  },
  {
    text: "视频",
    classname: "custom-icon-video",
    path: "/films",
  },
  {
    text: "电台",
    classname: "custom-icon-radio",
    path: "/musicroom/dj",
  },
];
let mymusic = [
  // {
  //   text: "播放历史",
  //   classname: "custom-icon-history",
  //   path: "/history",
  // },
  {
    text: "音乐云盘",
    classname: "custom-icon-Ioniconsmdcloudoutline",
    path: "/cloudpan",
  },
  {
    text: "我的收藏",
    classname: "custom-icon-user-start",
    path: "/collection",
  },
];

export default {
  name: "Left",
  data() {
    return {
      onlinelist,
      mymusic,
    };
  },
};
</script>

<style lang="scss">
.left-view {
  line-height: 1;
  width: 190px;
  height: 100%;
  background-color: #f0f0f0;
  box-sizing: border-box;
  header {
    display: flex;
    align-items: center;
    padding-left: 36px;
    .custom-icon-fanqiezhuanzhuwu-shouye-fanqiezhong {
      color: #1296db;
      font-size: 40px;
    }
    .webfont {
      color: grey;
      font-weight: bold;
      font-size: 20px;
    }
  }
  section {
    margin-top: 40px;
    p {
      color: grey;
      font-size: 12px;
      margin-top: 10px;
      padding-left: 40px;
    }

    ul > li {
      width: 130px;
      margin-top: 10px;
      margin-left: 20px;
      padding-left: 20px;
      padding-top: 5px;
      padding-bottom: 5px;
      display: flex;
      align-items: center;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: #d9d9d9;
      }
      span {
        font-size: 14px;
        color: #2f3542;
        margin-left: 10px;
      }
      .custom-icon {
        font-size: 18px;
      }
    }
  }
  .top-active {
    background-color: #d9d9d9;
  }
}
</style>