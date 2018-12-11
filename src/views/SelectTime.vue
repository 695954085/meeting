<template>
  <div class="select-time">
    <x-header title="slot:overwrite-title">
      <div class="overwrite-title-demo"
           slot="overwrite-title">
        <div @click="handleSelectRoom">{{roomName}}</div>
        <x-icon type="ios-arrow-down"
                size="26"
                class="arrow-down"></x-icon>
      </div>
      <a slot="right"
         @click="certainBookTime">确定</a>
    </x-header>

    <div class="select-time-content">
      <div class="select-time-calendar">
        <div class="week-title">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span></div>
        <div class="week-detail">
          <div v-for="(item,index) in weekDetail"
               :key="item.day"
               @click="handleSelectDay(index)"
               :class="{active: item.isActive}">
            <span>{{item.day|judgeIsToday}}</span><span>{{item.lunar}}</span>
          </div>
        </div>
      </div>
      <div class="select-time-divider"></div>
      <div class="select-time-date">{{getCurrentDay}}</div>
      <div class="select-time-block">
        <div v-for="(items,index) in timeSlot"
             :key="index"
             class="select-time-outter">
          <span v-for="(item,index) in items"
                :key="index"
                class="select-time-inner"
                :class="{
                  unable: !item.isAble,
                  select: item.isSelect }"
                @click="handleSelectTime(item.text)">{{item.text}}
          </span>
        </div>
      </div>
    </div>
    <actionsheet v-model="showRoom"
                 :menus="roomMenu"
                 @on-click-menu="selectRoom"></actionsheet>
  </div>
</template>
<script>
import { Actionsheet } from 'vux'
import { mapMutations, mapState } from 'vuex'
import Time from '../utils/time.js'
import { getBookTimeSpace } from '@/api/'
import { vuxInfo } from '@/utils/alert.js'
export default {
  name: 'SelectTime',
  components: {
    Actionsheet
  },
  data () {
    return {
      showRoom: false,
      roomMenu: ['会议室1', '会议室2', '会议室3'],
      mockTime: [{ startTime: '09:00', endTime: '09:30' }, { startTime: '11:00', endTime: '12:30' }]
    }
  },
  methods: {
    ...mapMutations(['selectWeek', 'setdayTime', 'setbookTime', 'setbookLocation']),
    handleSelectRoom () {
      this.showRoom = true
    },
    handleSelectTime (value) {
      let tempBool = false
      let a = this.dayTime.find(this.hasTimeText(value))
      let b = this.dayTime.filter(this.hasTimeAble(false))
      if (a.isAble) {
        if (this.bookTime.startTime && !this.bookTime.endTime) {
          let selectspace = Time.getTimeSpace({ startTime: this.bookTime.startTime, endTime: value })
          for (let i = 0; i < selectspace.length; i++) {
            let c = b.some(this.hasTimeText(selectspace[i]))
            if (c) {
              tempBool = true
              break
            }
          }
          if (!tempBool) {
            this.setbookTime({ endTime: value })
          }
        } else {
          this.setbookTime({ startTime: value })
        }
      }
    },
    certainBookTime () {
      this.$router.push(`/addMeet`)
    },
    hasTimeText (text) {
      return character => character.text === text
    },
    hasTimeAble (isAble) {
      return character => character.isAble === false
    },
    selectRoom (index) {
      this.setbookLocation(index + 1)
      // 更改房间之后也得重新查一次更新数据
      this.queryState()
    },
    // 请求对应日期房间数据
    async queryState () {
      // 请求数据状态
      let comitDate = `${this.currentday.year}/${this.currentday.month}/${this.currentday.day}`
      let responseValue = await getBookTimeSpace(comitDate, this.bookLocation)
      let { data, status } = responseValue
      if (status !== 200) {
        vuxInfo(this, '请求异常')
      } else {
        console.log(data)
        this.setdayTime(data)
      }
      // let a = [{ startTime: '13:00', endTime: '15:30' }]
      // this.setdayTime(a)
    },
    async handleSelectDay (index) {
      // 设置选中日期
      this.selectWeek(index)
      this.queryState()
    },
    setTodayData (value) {
      this.setdayTime(value)
    }
  },
  async mounted () {
    this.queryState()
    // this.setTodayData(this.mockTime)
  },
  computed: {
    ...mapState(['weekData', 'dayTime', 'bookTime', 'currentday', 'bookLocation']),
    roomName: function () {
      return this.roomMenu[this.bookLocation - 1]
    },
    weekDetail: function () {
      return this.weekData
    },
    timeSlot: function () {
      let cutSlot = []
      for (let i = 0; i < this.dayTime.length; i += 4) {
        cutSlot.push(this.dayTime.slice(i, i + 4))
      }
      return cutSlot
    },
    getCurrentDay: function () {
      let monthValue = this.currentday.month + '月'
      let dayValue = this.currentday.day + '日'
      let weekValue = '周' + this.currentday.week
      let dateValue = monthValue + dayValue + ' ' + weekValue
      return dateValue
    }
  },
  filters: {
    judgeIsToday: function (value) {
      let today = new Date()
      if (value === today.getDate()) {
        return '今'
      }
      return value
    }
  }
}
</script>
<style lang="less" scoped>
.select-time {
  .overwrite-title-demo {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    .arrow-down {
      fill: #ccc;
      padding: 0 4px;
    }
  }
  .select-time-content {
    .select-time-calendar {
      .week-title {
        display: flex;
        span {
          flex-grow: 1;
          font-size: 26px;
        }
      }
      .week-detail {
        display: flex;
        padding: 8px 0;
        & > div {
          // flex-grow: 1;
          width: 106px;
          height: 106px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          span {
            display: inline-block;
            width: 100%;
          }
          span:first-child {
            font-size: 30px;
          }
          span:last-child {
            font-size: 20px;
          }
        }
        & > div.active {
          background-color: #366bfd;
          border-radius: 50%;
          color: #fff;
        }
      }
    }
    .select-time-divider {
      width: 100%;
      height: 10px;
      background-color: #e9e9e9;
    }
    .select-time-date {
      font-family: PingFangSC-Regular;
      font-size: 30px;
      color: #333333;
      width: 750px;
      height: 52px;
      line-height: 52px;
    }
    .select-time-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 60px;
      .select-time-outter {
        height: 80px;
        line-height: 80px;
        border-radius: 40px;
        width: 84%;
        background-color: #f1f1f1;
        display: flex;
        margin: 0 0 30px 0;
        span:nth-child(4n + 1) {
          border-radius: 40px 0 0 40px;
        }
        span:nth-child(4n + 0) {
          border-radius: 0 40px 40px 0;
        }
        // span.select:first-child {
        //   background-color: #00aeff;
        // }
        // span.select:last-child {
        //   background-color: #00aeff;
        // }
        .select-time-inner {
          font-family: PingFangSC-Medium;
          font-size: 26px;
          font-weight: normal;
          font-stretch: normal;
          flex-grow: 1;
          letter-spacing: 0px;
          color: #888888;
        }
        .select-time-inner.able {
          background-color: #f1f1f1;
        }
        .select-time-inner.unable {
          background-color: #bbbbbb;
        }
        .select-time-inner.select {
          // background-color: #bae9ff;
          background-color: #00aeff;
        }
      }
    }
  }
}
</style>
