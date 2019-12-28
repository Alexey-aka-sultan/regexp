import Vue from 'vue'
import store from './store/index'
import $ from 'jquery'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

window.$ = $;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
