import Vue from 'vue'
import Vuex from 'vuex'
import metting from './modules/meeting/'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    metting
  }
})

export default store
