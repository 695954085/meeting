// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import store from './store/store'
import FastClick from 'fastclick'

import {
  AlertPlugin,
  ToastPlugin,
  XInput,
  XTextarea,
  Group,
  XButton,
  LoadingPlugin,
  ConfirmPlugin,
  XHeader
} from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin, {
  position: 'bottom'
})
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.component('x-input', XInput)
Vue.component('x-textarea', XTextarea)
Vue.component('group', Group)
Vue.component('x-button', XButton)
Vue.component('x-header', XHeader)

Vue.config.productionTip = false

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

/* eslint-disable no-new */
Vue.use(VueRouter)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
