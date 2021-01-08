import Vue from 'vue'
import Vuex from 'vuex'
import { getLikes, getSongDetail } from '@/api/like/like.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: [],
    uid: 0,
    userinfo: {
      avatarUrl: '',
      follows: 0,
      followeds: 0,
      eventcount: 0,
      nickname: '请登录'
    }
  },
  getters: {
    len(state) {
      return state.playlist.length
    },
    avatarUrl(state) {
      return state.userinfo.avatarUrl
    },
    follows(state) {
      return state.userinfo.follows
    },
    followeds(state) {
      return state.userinfo.followeds
    },
    eventcount(state) {
      return state.userinfo.eventcount
    },
    nickname(state) {
      return state.userinfo.nickname
    }
  },
  mutations: {
    initPlaylist(state, sinfo) {
      state.playlist = sinfo
    },
    updateUid(state, nid) {
      state.uid = nid;
    },
    updateUser(state, args) {
      state.userinfo = args
    },
    removeUser(state) {
      state.userinfo = {
        avatarUrl: '',
        follows: 0,
        followeds: 0,
        eventcount: 0,
        nickname: '请登录'
      }
    }
  },
  actions: {
    async getLoveMusic({ commit, state }) {
      // 568642919
      const ids = await getLikes(state.uid)
      const songs = await getSongDetail(ids.slice(0, 50).join(","))
      commit('initPlaylist', songs)
    }
  },
  modules: {
  },
  strict: true
})
