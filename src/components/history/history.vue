<template>
  <div class="history">
    <p>history</p>
    <div class="sector"></div>
  </div>
</template>

<script>
export default {
  name: "History",
};
</script>

<style lang="scss">
.history {
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
  // background-color: grey;
}
</style>