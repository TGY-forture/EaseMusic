<template>
  <div class="video">djkfjkdfjkdjf</div>
</template>

<script>
export default {
  name: "films",
};
</script>

<style lang="scss">
.video {
  height: calc(100% - 56px);
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
}
</style>