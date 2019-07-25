import Vue from 'vue'
import Vuex from 'vuex'
import { getPlugins } from '@/api/service/plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plugins: []
  },
  mutations: {
    SET_PLUGINS (state, val) {
      state.plugins = val
    }
  },
  actions: {
    refreshPlugins ({ commit }) {
      getPlugins().then(res => {
        if (!res.result) {
          commit('SET_PLUGINS', res.data)
        }
      })
    }
  },
  getters: {
    getPlugins (state) {
      return state.plugins
    }
  }
})
