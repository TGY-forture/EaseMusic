<template>
  <span
    class="t-box"
    :class="add ? 'before' : ''"
    :style="{ backgroundColor: color, color: textcolor }"
  >
    <i class="custom-icon f-icon" :class="iconclass"></i>
    <span>{{ content }}</span>
    <span><slot name="suffix"></slot></span>
  </span>
</template>

<script>
export default {
  name: "box",
  props: {
    color: {
      type: String,
      default: "rgb(230, 221, 221)",
    },
    textcolor: {
      type: String,
      default: "grey",
    },
    iconclass: { type: String, required: true },
    content: { type: String, required: true },
    add: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.t-box {
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-right: 12px;
  padding: 2px 20px;
  border-radius: 13px;
  span:nth-child(2) {
    margin-right: 8px;
  }
  span:nth-child(3) i {
    font-size: 14px;
  }
  .f-icon {
    margin-right: 5px;
    font-size: 14px;
  }
}
.before::before {
  content: "";
  background-color: rgb(199, 192, 192);
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 37px;
}
</style>