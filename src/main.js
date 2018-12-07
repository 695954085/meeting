// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import store from './store/store'
import VueTouch from 'vue-touch'
// import buggyfill from 'viewport-units-buggyfill'
// import buggyfillhacks from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks'

import {
  AlertPlugin,
  ToastPlugin,
  XInput,
  XTextarea,
  Group,
  XButton,
  LoadingPlugin,
  XHeader
} from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.component('x-input', XInput)
Vue.component('x-textarea', XTextarea)
Vue.component('group', Group)
Vue.component('x-button', XButton)
Vue.component('x-header', XHeader)

Vue.use(VueTouch, {
  name: 'v-touch'
})

VueTouch.config.swipe = {
  threshold: 100 // 手指左右滑动距离
}

// buggyfill.init({
//   hacks: buggyfillhacks
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueRouter)

// document.addEventListener('deviceready', function () {
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
// window.navigator.splashscreen.hide()
// }, false)
