const getters = {
  showData(state) {
    return function(index) {
      return index === 0 ? state.filterData[0] : state.filterData[1]
    }
  }
}

export default getters
