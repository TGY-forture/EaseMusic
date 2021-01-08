<template>
  <div class="user" ref="u">
    <a-avatar class="avatar" :src="avatarUrl" icon="user" @click="showModal" />
    <a-dropdown
      placement="bottomCenter"
      :trigger="['click']"
      :getPopupContainer="
        () => {
          return $refs.u;
        }
      "
    >
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        {{ nickname }}<i class="custom-icon custom-icon-arrow-down"></i>
      </a>
      <div class="u-drop" slot="overlay">
        <div class="concern">
          <div>
            <p>{{ eventcount }}</p>
            <p>动态</p>
          </div>
          <div>
            <p>{{ follows }}</p>
            <p>关注</p>
          </div>
          <div>
            <p>{{ followeds }}</p>
            <p>粉丝</p>
          </div>
        </div>
        <a-button @click="dailySign">签到</a-button>
        <ul class="citem">
          <li @click="toLevel">
            <i class="custom-icon custom-icon-level"></i>
            <span>等级</span>
            <i class="uarrow custom-icon custom-icon-Right"></i>
          </li>
          <li>
            <i class="custom-icon custom-icon-user_info"></i>
            <span>个人信息</span>
            <i class="uarrow custom-icon custom-icon-Right"></i>
          </li>
          <li>
            <i class="custom-icon custom-icon-log-out"></i>
            <span @click="logOut">退出登录</span>
          </li>
        </ul>
      </div>
    </a-dropdown>
    <a-dropdown
      placement="bottomCenter"
      :trigger="['click']"
      :getPopupContainer="
        () => {
          return $refs.u;
        }
      "
    >
      <i class="nav-ri custom-icon custom-icon-Email"></i>
      <Message slot="overlay" />
    </a-dropdown>
    <i class="nav-ri custom-icon custom-icon-sub"></i>
    <i class="nav-ri custom-icon custom-icon-error"></i>
    <a-modal
      v-model="visible"
      :footer="null"
      :mask="false"
      :destroyOnClose="true"
      :width="300"
      class="modal-log"
    >
      <i slot="closeIcon" class="custom-icon custom-icon-error"></i>
      <div class="pic-phone">
        <i class="custom-icon custom-icon-cellphone_hover_hov"></i>
      </div>
      <a-form-model
        layout="inline"
        @submit="handleSubmit"
        @submit.native.prevent
      >
        <a-form-model-item>
          <a-input
            addon-before="+86"
            :allowClear="true"
            type="text"
            v-model="phone"
            placeholder="请输入手机号"
          >
            <i slot="prefix" class="custom-icon custom-icon-contextphone"></i>
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            :allowClear="true"
            placeholder="请输入密码"
            type="password"
            autocomplete
            v-model="pass"
          >
            <i
              slot="prefix"
              class="custom-icon custom-icon-suoguanli-icon-grey"
            ></i>
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-checkbox @change="onChange">自动登录</a-checkbox>
        </a-form-model-item>
        <a-form-model-item>
          <a-button htmlType="submit">登录</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { log, dailySignin, getUserInfo } from "@/api/userinfo/userinfo.js";
import Message from "./message";
import { mapMutations, mapGetters } from "vuex";
import Bus from "@/assets/js/bus.js";
export default {
  name: "User",
  components: {
    Message,
  },
  data() {
    return {
      visible: false,
      phone: "",
      pass: "",
    };
  },
  computed: {
    ...mapGetters([
      "follows",
      "followeds",
      "eventcount",
      "avatarUrl",
      "nickname",
    ]),
  },
  mounted() {
    const cookies = document.cookie;
    if (cookies.includes("__remember_me")) {
      return;
    } else {
      log("18361812729", "tgy12345")
        .then((res) => {
          this.updateUid(res.userid);
          return getUserInfo(res.userid);
        })
        .then((data) => {
          this.updateUser(data);
          Bus.$emit("log");
        });
    }
  },
  methods: {
    ...mapMutations(["updateUser", "updateUid", "removeUser"]),
    showModal() {
      this.visible = true;
    },
    handleSubmit() {
      log(this.phone, this.pass)
        .then((res) => {
          if (res.code === 200) {
            this.phone = "";
            this.pass = "";
            this.$message.success("登录成功");
            this.visible = false;
            this.updateUid(res.userid);
            return getUserInfo(res.userid);
          } else {
            this.$message.error("登录失败");
          }
        })
        .then((data) => {
          this.updateUser(data);
          Bus.$emit("log");
        });
    },
    toLevel() {
      window.open("https://music.163.com/#/user/level", "blank");
    },
    dailySign() {
      dailySignin();
    },
    logOut() {
      this.$axios.get("/logout").then((res) => {
        if (res.data.code == 200) {
          this.$message.success("已下线");
          this.removeUser();
        }
      });
    },
    onChange(e) {
      // console.log(`checked = ${e.target.checked}`);
    },
  },
};
</script>

<style lang="scss">
.user {
  display: flex;
  align-items: center;
  margin-left: auto;
  .ant-dropdown-link {
    color: grey;
    margin-left: 10px;
    &:hover {
      color: #1890ff;
    }
  }
  .u-drop {
    background-color: white;
    border-radius: 6px;
    width: 220px;
    padding: 0 14px 5px;
    .concern {
      padding-top: 20px;
      display: flex;
      justify-content: space-around;
      text-align: center;
      align-items: center;
      div {
        cursor: pointer;
      }
      p {
        margin-bottom: 0;
        &:nth-child(2) {
          margin: 0 10px;
        }
      }
    }
    .citem {
      margin-bottom: 0;
      li {
        display: flex;
        align-items: center;
        border-radius: 6px;
        margin-bottom: 6px;
        padding-left: 5px;
        cursor: pointer;
        &:hover {
          background-color: #f0f1f2;
        }
        span {
          margin-left: 10px;
        }
        .uarrow {
          margin-left: auto;
        }
      }
    }
    .ant-btn {
      border-radius: 16px;
      margin: 15px auto;
      display: block;
    }
  }
  .avatar {
    cursor: pointer;
  }
  .nav-ri {
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      color: #1ecc94;
    }
  }
  .custom-icon {
    font-size: 20px;
  }
  .custom-icon-arrow-down {
    vertical-align: middle;
  }
}
.modal-log {
  .pic-phone {
    text-align: center;
    .custom-icon-cellphone_hover_hov {
      font-size: 80px !important;
      color: #0984e3;
    }
  }
  .ant-form {
    .ant-row {
      display: flex;
      justify-content: center;
      margin-right: 0 !important;
      .ant-col {
        width: 236px;
      }
    }
    .ant-btn {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 38px;
      margin-bottom: 15px;
    }
  }
}
</style>