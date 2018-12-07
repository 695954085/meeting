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
      <a slot="right">确定</a>
    </x-header>

    <div class="select-time-content">
      <v-touch v-on:swipeleft="onSwipeLeft">
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
                 :key="index"
                 @click="handleSelectDay"
                 :class="{active: item.isActive}">
              <span>{{item.day}}</span><span>{{item.lunar}}</span>
            </div>
          </div>
        </div>
      </v-touch>
      <div class="select-time-date"></div>
      <div class="select-time-block">
        <div v-for="items in timeSlot"
             :key="items"
             class="select-time-outter">
          <span v-for="(item,index) in items"
                :key="index"
                class="select-time-inner">{{item}}
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
import Lunar from '../utils/lunar.js'

export default {
  name: 'SelectTime',
  components: {
    Actionsheet
  },
  data () {
    return {
      showRoom: false,
      currentIndex: 0,
      roomMenu: ['会议室1', '会议室2', '会议室3']
    }
  },
  methods: {
    handleSelectRoom () {
      this.showRoom = true
    },
    selectRoom (key) {
      this.currentIndex = key
    },
    getFirstDay () {
      let date = new Date()
      let week = date.getDay() - 1
      date = this.addDate(date, week * -1)
      return new Date(date)
    },
    addDate (date, n) {
      date.setDate(date.getDate() + n)
      return date
    },

    formatDate (date) {
      var year = date.getFullYear()
      var month = (date.getMonth() + 1)
      var day = date.getDate()
      var week = '(' + ['日', '一', '二', '三', '四', '五', '六'][date.getDay()] + ')'
      var lunar = Lunar.GetLunarDay(year, month, day)
      return { year: year, month: month, day: day, week: week, lunar: lunar, isActive: false }
    },
    onSwipeLeft () {
      console.log('sssss')
    },
    handleSelectDay (index) {
      alert(index)
      // this.weekDetail.foreach(element => {
      //   element.isActive = false
      // })
      this.weekDetail[index].isActive = true
    }
  },
  computed: {
    roomName: function () {
      return this.roomMenu[this.currentIndex]
    },
    weekDetail: function () {
      let detail = []
      let date = this.getFirstDay()
      for (var i = 0; i < 7; i++) {
        detail.push(this.formatDate(i === 0 ? this.addDate(date, -1) : this.addDate(date, 1)))
      }
      // detail这里给个filter
      let day = new Date().getDate()
      for (i = 0; i < detail.length; i++) {
        if (detail[i].day === day) {
          detail[i].day = '今'
          detail[i].isActive = true
        }
      }
      return detail
    },
    timeSlot: function () {
      let cutSlot = []
      let timeSlot = []
      for (let i = 9; i < 21; i++) {
        let temp = [':00', ':30']
        for (let j = 0; j < temp.length; j++) {
          if (i === 9) {
            i = '09'
          }
          timeSlot.push(i + temp[j])
        }
      }
      for (let i = 0; i < timeSlot.length; i += 4) {
        cutSlot.push(timeSlot.slice(i, i + 4))
      }
      return cutSlot
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
        }
      }
      .week-detail {
        display: flex;
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
        }
        & > div.active {
          background-color: #366bfd;
          border-radius: 50%;
          color: #fff;
        }
      }
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
        .select-time-inner {
          font-family: PingFangSC-Medium;
          font-size: 26px;
          font-weight: normal;
          font-stretch: normal;
          flex-grow: 1;
          letter-spacing: 0px;
          color: #888888;
          border-radius: 40px;
          &:hover {
            background-color: #bae9ff;
          }
        }
      }
    }
  }
}
</style>
