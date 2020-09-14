import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music: {
      title: '当前暂无音乐正在播放',
      artist: '放一首喜欢的歌吧',
      src: '',
      pic: '',
      lrc: ''
    }
  },
  mutations: {
    updateMusic (state, payload) {
      state.music = payload.music
    }
  },
  actions: {
  },
  modules: {
  }
})
