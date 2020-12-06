<template>
  <div class="films-label" v-show="show">
    <span
      v-for="(item, index) of alabel"
      :class="slabel == item.name ? 'selected' : ''"
      :key="index"
      @click="$emit('update', item.name, item.id)"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "alabel",
  props: ["alabel", "slabel", "show"],
};
</script>

<style lang="scss" scoped>
.films-label {
  width: 704px;
  height: 300px;
  padding: 20px;
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 3;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #dfe3e6;
    border-radius: 2px;
  }
  span {
    width: 80px;
    text-align: center;
    margin-top: 15px;
    font-size: 12px;
    padding: 2px 0;
    border-radius: 10px;
    cursor: pointer;
    &:not(:nth-child(6n)) {
      margin-right: 36px;
    }
    &:hover {
      color: #ec4141;
    }
  }
}
</style>