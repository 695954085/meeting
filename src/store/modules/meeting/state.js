import Week from '@/utils/week.js'
import Time from '@/utils/time.js'
export default {
  user: {
    usercard: '',
    username: ''
  },
  filterData: [], // 孩子和meetingData格式一致，存放是否完成分类
  showData: [],
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
