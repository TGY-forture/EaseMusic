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
@import url("//at.alicdn.com/t/font_2000699_f6s9ohl7k4c.css");
#app {
  width: 970px;
  height: 90%;
  border: 1px solid #000;
  // border: 1px solid #f5f5f5;
  border-radius: 4px;
  margin: 20px auto 0;
  display: flex;
}
</style>
