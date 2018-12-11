import Vue from 'vue'
import Vuex from 'vuex'
import Week from '../utils/week.js'
import Time from '../utils/time.js'

Vue.use(Vuex)

const state = {
  usercard: 'A1002',
  meetingData: [{
    'day': '1970-00-01',
    'data': [{
      token: '53815dcd',
      state: '1',
      subject: '诸神的黄昏',
      startTime: '10:00',
      endTime: '11:00',
      room: '2',
      participants: '宙斯,雅典娜,普罗米修斯'
    }
    ]
  }],
  detailCount: {
    timeIndex: 0,
    dataIndex: 0
  },
  bookTitle: '',
  bookLocation: 0, // 预约位置
  bookPersonList: [], // 预约参会人员
  bookTime: {}, // 预约时间段
  currentday: Week.getTodayData(), // 预约日期
  weekData: Week.getWeekData(), // 存一下当前点击请求的日期
  dayTime: Time.getTime() // 存储当前日期的时间段状态
}

// bookTime = {startTime:'09:00',endTime:'10:00'}
// dayTime: [{ startTime: '09:00', endTime: '10:00' }, { startTime: '11:00', endTime: '12:30' }]

const mutations = {
  setusercard: (state, data) => {
    state.usercard = data
  },
  setmeetingData: (state, data) => {
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
      let dataArray = data.filter(character => character.bookDate === exchangeDate[i])
      let temp = {}
      temp.day = exchangeDate[i]
      temp.data = dataArray
      exchangeData.push(temp)
    }
    state.meetingData = exchangeData
  },
  setdetailCount: (stete, data) => {
    state.detailCount = data
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
          setIndex.push(i)
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
  },

  setbookTime: (state, data) => {
    // 保存修改时间
    if (state.bookTime.startTime && state.bookTime.endTime) {
      // 都有值时需先清空对象
      state.bookTime = {}
    }
    Object.assign(state.bookTime, data)
    // 时间值校验
    if (!Time.compareTime(state.bookTime)) {
      state.bookTime = {}
    }
    // 处理日期数据
    if (state.bookTime.startTime && !state.bookTime.endTime) {
      for (let i = 0; i < state.dayTime.length; i++) {
        if (state.dayTime[i].text === state.bookTime.startTime) {
          state.dayTime[i].isSelect = true
        } else {
          state.dayTime[i].isSelect = false
        }
      }
    } else {
      let a = Time.getTimeSpace(state.bookTime)
      for (let i = 0; i < state.dayTime.length; i++) {
        state.dayTime[i].isSelect = false
        for (let j = 0; j < a.length; j++) {
          if (state.dayTime[i].text === a[j]) {
            state.dayTime[i].isSelect = true
          }
        }
      }
    }
  },
  clearbookTime: (state) => {
    // 清空预约时间段
    state.bookTime = {}
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
