const getTime = () => {
  let timeSlot = []
  for (let i = 9; i < 21; i++) {
    let temp = [':00', ':30']
    for (let j = 0; j < temp.length; j++) {
      if (i === 9) {
        i = '09'
      }
      let item = {}
      item.text = i + temp[j]

      item.isAble = true
      item.isSelect = false
      timeSlot.push(item)
    }
  }
  return timeSlot
}
const getPrevTimeSpace = (value) => {
  let tempArr = value.split(':')
  let nextValue = ''
  if (tempArr[1] === '00') {
    nextValue = (parseInt(tempArr[0]) - 1).toString() + ':30'
    if (nextValue === '9:30') {
      nextValue = '09:30'
    }
  } else {
    nextValue = tempArr[0] + ':00'
  }
  return nextValue
}
const getNextTimeSpace = (value) => {
  let tempArr = value.split(':')
  let nextValue = ''
  if (tempArr[1] === '00') {
    nextValue = tempArr[0] + ':30'
  } else {
    nextValue = (parseInt(tempArr[0]) + 1).toString() + ':00'
  }
  return nextValue
}
const getTimeSpace = data => {
  let startTime = data.startTime
  let endTime = data.endTime
  if (!startTime || !endTime) {
    return []
  }
  let timeSpace = []
  let start = startTime.split(':')
  let end = endTime.split(':')
  let temp = [':00', ':30']
  for (let i = parseInt(start[0]); i <= parseInt(end[0]); i++) {
    for (let j = 0; j < temp.length; j++) {
      let perfix = i.toString()
      if (i === 9) {
        perfix = '09'
      }
      timeSpace.push(perfix + temp[j])
    }
  }
  if (start[1] === '30') {
    timeSpace.shift()
  }
  if (end[1] === '00') {
    timeSpace.pop()
  }
  return timeSpace
}
// 验证时间格式,正确返回true
const compareTime = data => {
  let startTime = data.startTime
  let endTime = data.endTime
  if (!startTime || !endTime) {
    // endTime空时无条件正确
    return true
  }
  let start = startTime.split(':')
  let end = endTime.split(':')

  if (
    parseInt(end[0]) === parseInt(start[0]) &&
    parseInt(end[1]) > parseInt(start[1])
  ) {
    return true
  }
  if (parseInt(end[0]) > parseInt(start[0])) {
    return true
  }
  return false
}
// 日期字符串升序排序
const degressDate = data => {
  let exchange = []
  let returnValue = []
  data.forEach(element => {
    exchange.push(new Date(element))
  })
  exchange.sort(function(a, b) {
    return a > b ? 1 : -1
  })
  exchange.forEach(element => {
    returnValue.push(
      `${element.getFullYear()}/${element.getMonth() + 1}/${element.getDate()}`
    )
  })
  return returnValue
}

// date对象返回指定格式
const getFormatDateString = (date, connector) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return `${year}${connector}${month}${connector}${day}`
}

export default {
  getTime,
  getTimeSpace,
  compareTime,
  degressDate,
  getFormatDateString,
  getPrevTimeSpace,
  getNextTimeSpace
}
