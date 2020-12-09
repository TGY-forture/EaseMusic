import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { getMp3Url, getLikes, getSongDetail } from '@/api/like/like.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: [],
  },
  getters: {
    len(state) {
      return state.playlist.length
    }
  },
  mutations: {
    initPlaylist(state, sinfo) {
      state.playlist = sinfo
    }
  },
  actions: {
    async getLoveMusic({ commit }, uid) {
      const ids = await getLikes()
      const songs = await getSongDetail(ids.slice(0, 50).join(","))
      commit('initPlaylist', songs)
    }
  },
  modules: {
  }
  , strict: true
})
