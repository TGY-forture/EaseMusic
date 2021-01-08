<template>
  <div id="app">
    <Left />
    <Right />
    <PlayControl />
  </div>
</template>
<script>
import Left from "@/views/left";
import Right from "@/views/right";
import PlayControl from "@/components/util/playcontrol";
export default {
  name: "App",
  components: {
    Left,
    Right,
    PlayControl,
  },
};
</script>
<style lang="scss">
@import url("../src/assets/css/index.scss");
@import url("//at.alicdn.com/t/font_2000699_efx6qxef0vh.css");
#app {
  width: 1020px;
  height: 90%;
  border-radius: 4px;
  margin: 20px auto 0;
  display: flex;
  position: relative;
}
</style>
