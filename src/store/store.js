import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  bookTitle: '',
  bookLocation: '',
  bookTime: '',
  bookPersonList: []
}

const mutations = {
  setbookTitle: (state, data) => {
    state.bookTitle = data
  },
  setbookPersonList: (state, data) => {
    state.bookPersonList = data
  },
  setbookTime: (state, data) => {
    state.bookTime = data
  },
  setbookLocation: (state, data) => {
    state.bookLocation = data
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
