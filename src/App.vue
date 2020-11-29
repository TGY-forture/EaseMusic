<template>
  <div id="app">
    <Left />
    <Right />
  </div>
</template>
<script>
import Left from "@/views/left";
import Right from "@/views/right";
export default {
  name: "App",
  components: {
    Left,
    Right,
  },
};
</script>
<style lang="scss">
@import url("../src/assets/css/index.scss");
@import url("//at.alicdn.com/t/font_2000699_1qu1ppf9qh8.css");
#app {
  width: 1000px;
  height: 90%;
  border: 1px solid #000;
  // border: 1px solid #f5f5f5;
  border-radius: 4px;
  margin: 20px auto 0;
  display: flex;
}
</style>
