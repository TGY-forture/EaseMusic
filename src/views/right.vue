<template>
  <div class="right-view">
    <nav class="nav">
      <i
        class="u-arrow custom-icon custom-icon-Larrow"
        @click="$router.go(-1)"
      ></i>
      <i
        class="u-arrow custom-icon custom-icon-Right"
        @click="$router.go(1)"
      ></i>
      <!-- <div class="search">
        <input type="text" class="inp" disabled placeholder="搜索音乐" />
        <i class="custom-icon custom-icon-search1"></i>
      </div> -->
      <User />
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import User from "@/components/user/user";
export default {
  name: "Right",
  components: {
    User,
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