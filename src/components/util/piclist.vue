<template>
  <div
    class="u-plist"
    :style="{ width: width + 'px' }"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <div
      :style="{
        backgroundColor: color,
        borderRadius: '6px',
        position: 'relative',
      }"
    >
      <img
        class="s-pic"
        :src="src"
        :style="{ width: width + 'px', height: height + 'px' }"
        alt="logo"
      />
      <p class="dj-text" v-if="djtext == '' ? false : true">
        <i
          class="custom-icon custom-icon-person"
          v-if="inmlist"
          style="margin-right: 4px"
        ></i>
        {{ djtext }}
        <img
          :src="identifyIcon"
          v-if="identifyIcon"
          alt="logo"
          style="width: 16px; height: 16px; z-index: 5; margin-left: 4px"
        />
      </p>
    </div>
    <div class="n-pcnt" v-if="rightUp">
      <i class="custom-icon custom-icon-play2"></i>
      <span>{{ playcnt }}</span>
    </div>
    <i class="custom-icon custom-icon-play3 lu-icon" v-if="leftUpIcon"></i>
    <i
      class="custom-icon custom-icon-play3 rd-icon"
      v-if="rightDownIcon"
      :style="{ opacity: show ? 1 : 0, top: inmlist ? '140px' : '100px' }"
    ></i>
    <p class="b-text">{{ ptext }}</p>
    <p class="art" v-if="artist == '' ? false : true">
      {{ artist }}
    </p>
    <p class="mdate" v-if="date == '' ? false : true">{{ date }}</p>
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    leftUpIcon: { type: Boolean, default: false },
    rightDownIcon: { type: Boolean, default: true },
    rightUp: { type: Boolean, default: true },
    playcnt: { type: Number, default: 0 },
    ptext: { type: String, default: "" },
    color: { type: String, default: "white" },
    date: { type: String, deault: "" },
    artist: { type: String, default: "" },
    djtext: { type: String, default: "" },
    identifyIcon: { default: "" },
    inmlist: { type: Boolean, default: false },
  },
  data() {
    return {
      show: false,
    };
  },
  name: "PicList",
};
</script>

<style lang="scss" scoped>
.u-plist {
  margin-bottom: 15px;
  position: relative;
  overflow-x: hidden;
  cursor: pointer;
  .s-pic {
    border-radius: 6px;
  }
  .b-text {
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .dj-text {
    width: 100%;
    box-shadow: 0 -3px 4px 4px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
    padding: 2px 4px 6px;
    color: white;
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    border-radius: 6px;
  }
  .art {
    font-size: 14px;
    color: #95a5a6;
  }
  .mdate {
    position: absolute;
    top: 35%;
    left: 42%;
    font-size: 20px;
    font-weight: bold;
    color: #dd001b;
    margin-bottom: 0;
  }
  .n-pcnt {
    position: absolute;
    top: 5px;
    right: 10px;
    color: white;
    span {
      margin-left: 4px;
    }
  }
  .custom-icon {
    line-height: 1;
  }
  .lu-icon {
    position: absolute;
    font-size: 22px;
    top: 10px;
    left: 10px;
  }
  .rd-icon {
    position: absolute;
    font-size: 30px;
    // top: 100px;
    right: 10px;
    transition: opacity 0.5s;
    z-index: 7;
  }
}
</style>