export default {
  setdeskBookDate: (state, data) => {
    state.deskBookDate = data
  },
  setdeskBookSeatData: (state, data) => {
    state.deskBookSeatData = data
  },
  restoreDeskBookSeatData: state => {
    state.deskBookSeatData.forEach(element => {
      element.isActive = false
      element.isAble = true
    })
  },
  setunableBookSeatData: (state, data) => {
    // 用index 来实现挂钩
    data.forEach(element => {
      state.deskBookSeatData[parseInt(element) - 1].isAble = false
    })
  },
  setdeskBookDateCertain: (state, data) => {
    state.deskBookDateCertain = data
  },
  setdeskSeatCertain: (state, data) => {
    state.deskSeatCertain = data
  },
  setdeskBookRecord: (state, data) => {
    state.deskBookRecord = data
  },
  setPosition: (state, data) => {
    state.position.topValue = data.topValue
    state.position.leftValue = data.leftValue
  }
}
