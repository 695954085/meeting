import Vue from 'vue'
import Vuex from 'vuex'
import meeting from './modules/meeting/'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    meeting
  }
})

export default store
