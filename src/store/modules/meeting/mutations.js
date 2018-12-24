import Time from '@/utils/time.js'
import Vue from 'vue'
export default {
  setuser: (state, data) => {
    state.user = data
  },
  setmeetingData: (state, data) => {
    let finishArray = data.filter(character => character.state === '0')
    let unfinishArray = data.filter(character => character.state === '1')
    Vue.set(state.filterData, 0, handlemeetingData(unfinishArray))
    Vue.set(state.filterData, 1, handlemeetingData(finishArray))
  },
  setbookTitle: (state, data) => {
    state.bookTitle = data
  },
  setbookLocation: (state, data) => {
    state.bookLocation = data
  },
  setbookPersonList: (state, data) => {
    state.bookPersonList = data
  },
  selectWeek: (state, data) => {
    state.weekData.forEach(element => {
      element.isActive = false
    })
    state.weekData[data].isActive = true
    state.currentday = state.weekData[data]
  },
  setdayTime: (state, data) => {
    // 每次调用都置回初始值
    state.dayTime = Time.getTime()
    data.forEach(element => {
      let setIndex = []
      for (let i = 0; i < state.dayTime.length; i++) {
        if (state.dayTime[i].text === element.startTime) {
          setIndex.push(i)
        }
        if (state.dayTime[i].text === element.endTime) {
          setIndex.push(i - 1)
          break
        }
      }
      // 设置一下状态
      for (let i = 0; i < state.dayTime.length; i++) {
        if (i <= setIndex[1] && i >= setIndex[0]) {
          state.dayTime[i].isAble = false
        }
      }
    })
    // 再对dayTime过滤一次,连在一起的isHalfAble状态为true的重置回false
    // for (let i = 0; i < state.dayTime.length - 1; i++) {
    //   if (!state.dayTime[i].isAble && !state.dayTime[i + 1].isAble) {
    //     if (state.dayTime[i - 1].isHalfAble || !state.dayTime[i - 1].isAble) {
    //       // 下一个兄弟是unabled,上一个兄弟是头的时候
    //       continue
    //     } else {
    //       state.dayTime[i].isHalfAble = true
    //       state.dayTime[i].isAble = true
    //     }
    //   }
    //   if (!state.dayTime[i].isAble && state.dayTime[i + 1].isAble) {
    //     // 下一个兄弟是able的时候
    //     state.dayTime[i].isHalfAble = true
    //     state.dayTime[i].isAble = true
    //   }
    // }
  },
  setbookTime2: (state, data) => {
    // 1存储预约时间状态
    state.bookTime = data
    // 更改一下dayTime的状态
    let a = Time.getTimeSpace(state.bookTime)
    // 删除数组最后一个元素,因为设置状态用不上
    a.pop()
    state.dayTime.forEach(element => {
      element.isSelect = false
    })
    for (let i = 0; i < state.dayTime.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if (state.dayTime[i].text === a[j]) {
          state.dayTime[i].isSelect = true
        }
      }
    }
  },
  clearbookTime: state => {
    // 清空预约时间段
    state.bookTime = {}
  },
  setisBookTimeCertain: (state, data) => {
    state.isBookTimeCertain = data
  }
}

const handlemeetingData = data => {
  // 将请求的数据转换为指定格式
  let exchangeDate = []
  let exchangeData = []
  data.forEach(element => {
    if (!exchangeDate.includes(element.bookDate)) {
      exchangeDate.push(element.bookDate)
    }
  })

  exchangeDate = Time.degressDate(exchangeDate)
  for (let i = 0; i < exchangeDate.length; i++) {
    let dataArray = data.filter(
      character => character.bookDate === exchangeDate[i]
    )
    let temp = {}
    temp.day = exchangeDate[i]
    temp.data = dataArray
    exchangeData.push(temp)
  }
  return exchangeData
  // state.meetingData = exchangeData
}
