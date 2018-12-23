import axios from 'axios'
import config from '../config'
// 全局设置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 创建一个axios的实列
const instance = axios.create()
instance.defaults.headers.post['Content-Type'] =
  'application/json;charset=UTF-8'

// 用户登录
export const login = params =>
  instance.post(`${config.IP}:${config.PORT}${config.prefix}/logon`, params)
// 用户注册
export const register = params =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/registration`,
    params
  )
// 请求会议列表
export const getMeeting = usercard =>
  instance.get(
    `${config.IP}:${config.PORT}${
      config.prefix
    }/appointmentRoom-list/${usercard}`
  )
// 请求联系人
export const getLinkMan = usercard =>
  instance.get(
    `${config.IP}:${config.PORT}${config.prefix}/office-usernames/${usercard}`
  )
// 提交会议预约
export const bookMeeting = params =>
  instance.post(`${config.IP}:${config.PORT}${config.prefix}/bookRoom`, params)
// 获取被预约的时间段
export const getBookTimeSpace = (bookDate, room) =>
  instance.get(
    `${config.IP}:${config.PORT}${
      config.prefix
    }/appointmentRoom-daily-list/?bookDate=${bookDate}&room=${room}`
  )
// 管理员开门码
export const getAdminCode = () =>
  instance.get(`${config.IP}:${config.PORT}${config.prefix}/admin-code`)

// 会议室灯光控制

export const lightControl = params =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/meeting-room-switchs`,
    params
  )
// 工位预约

export const bookStation = params =>
  instance.post(
    `${config.IP}:${config.PORT}${config.prefix}/bookStation`,
    params
  )

// 根据员工工号查询预约工位列表
export const getDeskList = usercard =>
  instance.get(
    `${config.IP}:${config.PORT}${
      config.prefix
    }/appointmentStation-list/${usercard}`
  )

// 根据开始日期和结束日期获取被占用中的工位列表
export const getDeskState = (startTime, endTime) =>
  instance.get(
    `${config.IP}:${config.PORT}${
      config.prefix
    }/station-busy-list/?startTime=${startTime}&endTime=${endTime}`
  )
// 显示屏扫码后请求使用工位

export const updateDeskState = (token, userCard) =>
  instance.put(
    `${config.IP}:${config.PORT}${
      config.prefix
    }/appointmentStation/${token}/userCard/${userCard}`
  )

// 提前释放工位
export const releaseDesk = id =>
  instance.delete(
    `${config.IP}:${config.PORT}${config.prefix}/appointmentStation/${id}`
  )

export const getPosition = parmas => instance.post('http://10.8.6.4:4023/location/coordinate', parmas)
