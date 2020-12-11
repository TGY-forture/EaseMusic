<template>
  <div class="lyrics" v-show="show">{{ text }}</div>
</template>

<script>
export default {
  name: "lyrics",
  props: {
    id: Number,
    show: Boolean,
  },
  data() {
    return {
      text: "",
    };
  },
  watch: {
    async show(nv, ov) {
      if (nv) {
        const {
          data: {
            lrc: { lyric },
          },
        } = await this.$axios.get(`http://localhost:3000/lyric?id=${this.id}`);
        this.text = lyric;
        this.lyricParse(lyric);
      }
    },
  },
  methods: {
    lyricParse(lyric) {
      const patime = /\[(\S*)\]/g; //匹配时间
      const patcontent = /\]([^\[\]]*)\[/g; //匹配歌词
      // const split = /\[\S*\]/;    //使用split分割也行
      let lyr = lyric.replace(/\n/g, ""); //清除换行符
      let time = lyr.match(patime);
      let content = lyr.match(patcontent);
      content.forEach((el, index) => {
        content[index] = content[index].replace(/[\[\]]/g, ""); //去掉边界括号
      });
      console.log(content);
    },
  },
};
</script>

<style lang="scss" scoped>
.lyrics {
  width: 800px;
  height: 400px;
  position: fixed;
  top: 20px;
  left: 200px;
  background-color: grey;
}
</style>
