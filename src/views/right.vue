<template>
  <div class="right-view">
    <nav class="nav">
      <i class="u-arrow custom-icon custom-icon-Larrow"></i>
      <i class="u-arrow custom-icon custom-icon-Right"></i>
      <div class="search">
        <input type="text" class="inp" placeholder="搜索音乐" />
        <i class="custom-icon custom-icon-search1"></i>
      </div>
      <User />
    </nav>
    <MusicRoom />
  </div>
</template>

<script>
import User from "@/components/user/user";
import MusicRoom from "@/components/musicroom/musicroom";
export default {
  name: "Right",
  components: {
    MusicRoom,
    User,
  },
  methods: {
    dd() {
      console.log(1);
    },
  },
};
</script>

<style lang="scss">
.right-view {
  width: calc(100% - 190px);
  background-color: #f7f7f7;
  .nav {
    padding: 10px;
    display: flex;
    align-items: center;
    .search {
      position: relative;
      margin-left: 30px;
      .inp {
        width: 200px;
        border: none;
        background-color: #e0e0e0;
        height: 32px;
        border-radius: 16px;
        outline: none;
        padding: 0 28px;
        font-size: 14px;
      }
      .custom-icon-search1 {
        font-size: 18px;
        color: #596275;
        position: absolute;
        left: 6px;
        top: 3px;
      }
    }
    .u-arrow {
      margin-left: 10px;
      &::before {
        background-color: #ced6e0;
        font-size: 24px;
        color: #a4b0be;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
}
</style>