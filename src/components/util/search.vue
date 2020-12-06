<template>
  <div class="t-search">
    <input
      type="text"
      v-model="content"
      :placeholder="place"
      @keypress.enter="search"
    />
    <i
      class="custom-icon"
      :class="content == '' ? 'custom-icon-search1' : 'custom-icon-error'"
      @click="content = ''"
    >
    </i>
  </div>
</template>

<script>
export default {
  name: "search",
  props: {
    place: { type: String, dfault: "" },
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    search() {
      console.log(this.content);
    },
  },
};
</script>

<style lang="scss" scoped>
.t-search {
  position: relative;
  width: 200px;
  input {
    width: 200px;
    height: 30px;
    padding: 0 25px 0 10px;
    border: none;
    background-color: rgb(233, 226, 226);
    border-radius: 15px;
    outline: none;
  }
  .custom-icon {
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .custom-icon-error {
    font-size: 14px;
  }
}
</style>