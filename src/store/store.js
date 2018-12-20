import Vue from 'vue'
import Vuex from 'vuex'
import metting from './modules/meeting/'
import workarea from './modules/workarea/'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    metting,
    workarea
  }
})

export default store
