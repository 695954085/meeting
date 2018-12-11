import axios from 'axios'
import config from '../config'
// 全局设置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 创建一个axios的实列
const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 用户登录
export const login = params => instance.post(`${config.IP}:${config.PORT}${config.prefix}/logon`, params)
// 用户注册
export const register = params => instance.post(`${config.IP}:${config.PORT}${config.prefix}/logon`, params)
// 请求会议列表
export const getMeeting = usercard => instance.get(`${config.IP}:${config.PORT}${config.prefix}/appointmentRoom-list/${usercard}`)
// 请求联系人
export const getLinkMan = usercard => instance.get(`${config.IP}:${config.PORT}${config.prefix}/office-usernames/${usercard}`)
// 提交会议预约
export const bookMeeting = params => instance.post(`${config.IP}:${config.PORT}${config.prefix}/bookRoom`, params)
// 获取被预约的时间段
export const getBookTimeSpace = (bookDate, room) => instance.get(`${config.IP}:${config.PORT}${config.prefix}/appointmentRoom-daily-list/?bookDate=${bookDate}&room=${room}`)
