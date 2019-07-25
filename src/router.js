import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import HomePlugins from './views/Home/Plugins'
import PluginPage from './views/PluginPage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {
        name: 'homePlugins'
      },
      children: [{
        name: 'homePlugins',
        component: HomePlugins,
        path: 'plugins'
      }]
    }, {
      path: '/plugin',
      name: 'pluginPage',
      component: PluginPage
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
