import Vue from 'vue'
import Vuex from 'vuex'
import { getPlugins } from '@/api/service/plugins'
import { getProjects } from '@/api/service/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plugins: [],
    projects: []
  },
  mutations: {
    SET_PLUGINS (state, val) {
      state.plugins = val
    },
    SET_PROJECTS (state, val) {
      state.projects = val
    }
  },
  actions: {
    refreshPlugins ({ commit }) {
      getPlugins().then(res => {
        if (!res.result) {
          commit('SET_PLUGINS', res.data)
        }
      })
    },
    refreshProjects ({ commit }) {
      getProjects().then(res => {
        if (!res.result) {
          commit('SET_PROJECTS', res.data)
        }
      })
    }
  },
  getters: {
    getPlugins (state) {
      return state.plugins
    },
    getProjects (state) {
      return state.projects
    }
  }
})
