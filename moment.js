const moment = require('moment')

// console.log(moment().month())
// console.log(moment().month(moment().month()))
// console.log(moment().month(0))
// console.log(moment().month(1).startOf('month'))
// console.log(moment().add(0, 'month').startOf('month'))
// console.log(moment().add(1, 'month').startOf('month'))
// console.log(moment().add(1, 'month').startOf('month').add(1, 'day'))
// console.log(moment().add(1, 'month').startOf('month').add(0, 'day'))
// console.log(moment().add(1, 'month').startOf('month').add(1, 'day').format('YYYY年MM月'))
// console.log(moment().startOf('month').endOf('month').subtract(1, 'day').day())
// console.log(moment('20181219', 'YYYYMMDD').subtract(1, 'month').endOf('month'))

const getNextMonthMoments = (momentStr, day) => {
  const moments = []
  const nextMonthStartDayMoment = moment(momentStr, 'YYYYMMDD').add(1, 'month').startOf('month')
  for (let i = 0; i < 6 - day; i++) {
    const plainObj = Object.create(null)
    const calendar = i === 0
      ? nextMonthStartDayMoment.toArray()
      : nextMonthStartDayMoment.add(1, 'day').toArray()
    plainObj['calendar'] = calendar
    moments.push(plainObj)
  }
  return moments
}

const getLastMonthMoments = (momentStr, day) => {
  const moments = []
  const lastMonthEndDayMoment = moment(momentStr, 'YYYYMMDD').subtract(1, 'month').endOf('month')
  for (let i = 0; i < day; i++) {
    const plainObj = Object.create(null)
    const calendar =
      i === 0
        ? lastMonthEndDayMoment.toArray()
        : lastMonthEndDayMoment.subtract(1, 'day').toArray()
    plainObj['calendar'] = calendar
    moments.unshift(plainObj)
  }
  return moments
}
const dates = []
for (let x = 0; x < 3; x++) {
  // const lastDayMoment = moment().add(x, 'month').endOf('month')
  const lastDayMoment = x === 0 ? moment().endOf('month') : moment().add(x, 'month').endOf('month')
  const lastDay = lastDayMoment.day() // 当月最后一天周几
  const firstDayMoment = lastDayMoment.startOf('month')
  const firstDay = firstDayMoment.day() // 当月第一天周几
  const daysInMonth = firstDayMoment.daysInMonth()
  const lastMonthMoments = getLastMonthMoments(firstDayMoment.toDate(), firstDay)
  const nextMonthMoments = getNextMonthMoments(firstDayMoment.toDate(), lastDay)
  let momentItems = []
  for (let y = 0; y < daysInMonth; y++) {
    const plainObj = Object.create(null)
    const calendar =
      y === 0
        ? firstDayMoment.toArray()
        : firstDayMoment.add(1, 'day').toArray()
    plainObj['calendar'] = calendar
    momentItems.push(plainObj)
  }
  // 重新装载日期
  momentItems = [...lastMonthMoments, ...momentItems, ...nextMonthMoments]
  // this.dates.push(momentItems)
  dates.push(momentItems)
}
console.log(JSON.stringify(dates))
