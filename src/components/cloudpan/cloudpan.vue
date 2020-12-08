<template>
  <div class="cloudpan">
    <h2>我的音乐云盘</h2>
    <section class="contain">
      <span>云盘容量</span>
      <a-progress
        class="cloud-progress"
        :percent="percent"
        :show-info="false"
        status="active"
        size="small"
      ></a-progress>
      <span>{{ size + "G/" + maxSize + "G" }}</span>
      <span>歌曲永久保存,随时随地多端畅听</span>
      <a
        href="https://music.163.com/#/store/product/detail?id=34001"
        target="blank"
      >
        扩容
      </a>
    </section>
    <main class="main">
      <div>
        <i class="custom-icon custom-icon-player"></i>
        <span>播放全部</span>
        <i class="custom-icon custom-icon-plus"></i>
      </div>
      <div>
        <i class="custom-icon custom-icon-plus"></i>
        <span>上传音乐</span>
      </div>
      <Search />
    </main>
    <table class="cloud-list">
      <tr>
        <td></td>
        <td></td>
        <td>音乐标题</td>
        <td>歌手</td>
        <td>专辑</td>
        <td>格式</td>
        <td>大小</td>
        <td>上传时间</td>
      </tr>
      <tr v-for="(item, index) of cloudinfo" :key="index">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          <i class="custom-icon custom-icon-ic_correct"></i>
        </td>
        <td>
          {{ item.songName }}
        </td>
        <td>
          {{ item.artist }}
        </td>
        <td>
          {{ item.album }}
        </td>
        <td>{{ item.fileName }}</td>
        <td>
          {{ item.fileSize }}
        </td>
        <td>
          {{ item.addTime }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getCloudInfo } from "@/api/cloudpan/cloudpan.js";
import Search from "@/components/util/search";
export default {
  name: "CloudPan",
  components: {
    Search,
  },
  data() {
    return {
      size: 0,
      maxSize: 40,
      count: 0,
      cloudinfo: [],
    };
  },
  computed: {
    percent() {
      return Number((this.size / this.maxSize).toFixed(1));
    },
  },
  beforeMount() {
    getCloudInfo().then((res) => {
      ({
        info: this.cloudinfo,
        size: this.size,
        maxSize: this.maxSize,
        count: this.count,
      } = { ...res });
    });
  },
};
</script>

<style lang="scss">
.cloudpan {
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
  h2 {
    font-weight: bold;
  }
  .contain {
    font-size: 12px;
    display: flex;
    align-items: center;
    .cloud-progress {
      width: 100px;
      height: 20px;
      .ant-progress-inner {
        background-color: rgb(231, 222, 222);
      }
    }
    span:nth-child(1) {
      margin-right: 4px;
    }
    span:nth-child(3) {
      margin-left: 4px;
    }
    span:nth-child(4) {
      margin-left: 40px;
      margin-right: 10px;
    }
  }
  .main {
    margin-top: 20px;
    display: flex;
    align-items: center;
    div:first-child {
      background-color: red;
      border-radius: 16px;
      padding: 1px 15px;
      display: inline-block;
      position: relative;
      color: white;
      cursor: pointer;
      &::before {
        content: "";
        background-color: rgb(199, 192, 192);
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 37px;
      }
      .custom-icon-player {
        vertical-align: -3px;
        margin-right: 5px;
      }
      span:nth-child(2) {
        line-height: 20px;
        vertical-align: middle;
        padding-right: 10px;
      }
      .custom-icon-plus {
        vertical-align: middle;
        margin-left: 4px;
        font-size: 20px;
      }
    }
    div:nth-child(2) {
      margin-left: 30px;
      margin-right: auto;
      display: inline-block;
      padding: 0 15px;
      background-color: white;
      border: 1px solid rgb(177, 173, 173);
      border-radius: 15px;
      cursor: pointer;
      &:hover {
        background-color: rgb(231, 226, 226);
      }
      .custom-icon-plus {
        vertical-align: -3px;
        margin-right: 15px;
        font-size: 20px;
      }
    }
  }
  .cloud-list {
    border-top: 1px solid rgb(207, 203, 203);
    margin-top: 20px;
    tr {
      &:nth-child(even) {
        background-color: rgb(238, 231, 231);
      }
      td {
        padding: 5px 0;
        text-align: center;
        &:nth-child(1),
        &:nth-child(2) {
          width: calc(774px * 0.05);
        }
        &:nth-child(3) {
          width: calc(774px * 0.3);
        }
        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6),
        &:nth-child(7) {
          width: calc(774px * 0.11);
        }
        &:nth-child(8) {
          width: calc(774px * 0.16);
        }
        .custom-icon {
          color: rgb(41, 133, 41);
        }
      }
    }
  }
}
</style>