<template>
  <p class="u-sub-notify">暂无通知</p>
</template>

<script>
import { getNotification } from "@/api/userinfo/message.js";
export default {
  name: "notify",
};
</script>

<style lang="scss">
.u-sub-notify {
  width: 100%;
  height: 250px;
  text-align: center;
  line-height: 250px;
  font-size: 12px;
  color: rgb(209, 201, 201);
}
</style>