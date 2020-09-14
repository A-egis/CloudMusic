import Vue from 'vue'
import VueRouter from 'vue-router'
import Discover from '../views/Discover.vue'
import SongList from '../views/SongList.vue'
import Latest from '../views/Latest.vue'
import MV from '../views/MV.vue'
import Search from '../views/Search.vue'
import PlayList from '../views/PlayList.vue'
import MVPlay from '../views/MVPlay.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/discover'
  },
  {
    path: '/discover',
    name: 'discover',
    component: Discover
  }, {
    path: '/songList',
    name: 'songList',
    component: SongList
  }, {
    path: '/latest',
    name: 'latest',
    component: Latest
  }, {
    path: '/mv',
    name: 'mv',
    component: MV
  }, {
    path: '/search',
    name: 'search',
    component: Search
  }, {
    path: '/playlist',
    name: 'playlist',
    component: PlayList
  }, {
    path: '/mvplay',
    name: 'mvplay',
    component: MVPlay
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
export default router
