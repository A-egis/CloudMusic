import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 axios
import './plugins/axios'

// 导入element-ui
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'

// 导入全局过滤器
import './filters/filters.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
