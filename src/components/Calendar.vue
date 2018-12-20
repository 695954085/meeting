<template>
  <div class="selectBookTime">
    <div class="selectBookTime-calendar">
      <!-- 年份 月份 -->
      <div class="month">
        <ul>
          <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
          <li class="arrow"
              @click="pickPre(currentYear,currentMonth)">❮</li>
          <li class="year-month"
              @click="pickYear(currentYear,currentMonth)">
            <span class="choose-year-month">{{ currentYear }}年{{ currentMonth }}月</span>
          </li>
          <li class="arrow"
              @click="pickNext(currentYear,currentMonth)">❯</li>
        </ul>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
        <li style="color: #fa6017;">日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li style="color: #fa6017;">六</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
        <li v-for="(dayobject,index) in days"
            :key="index"
            @click="handleSelect(dayobject)"
            :class="{isSelect:dayobject.isSelect}">
          <!--本月-->
          <!--如果不是本月  改变类名加灰色-->
          <span v-if="dayobject.day.getMonth()+1 != currentMonth"
                class="other-month">{{ dayobject.day.getDate() }}</span>
          <!--如果是本月  还需要判断是不是这一天-->
          <span v-else>
            <!--今天  同年同月同日-->
            <span v-if="dayobject.day.getFullYear() === new Date().getFullYear() && dayobject.day.getMonth() === new Date().getMonth() && dayobject.day.getDate() === new Date().getDate()"
                  class="active">今</span>
            <span v-else>{{ dayobject.day.getDate() }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Calendar',
  data: function() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 0,
      days: []
    }
  },
  created: function() {
    // 在vue初始化时调用
    this.initData(null)
  },
  computed: {
    ...mapState('workarea', ['deskBookDate'])
  },
  methods: {
    ...mapMutations('workarea', ['setdeskBookDate']),
    initData: function(cur) {
      var date
      if (cur) {
        date = new Date(cur)
      } else {
        var now = new Date()
        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))
        d.setDate(35)
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      }
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1

      this.currentWeek = date.getDay() + 1 // 1...6,0
      if (this.currentWeek === 1) {
        this.currentWeek = 8
      }
      var str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      )
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      // 初始化本周
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str)
        d.setDate(d.getDate() - i)
        let dayobject = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d
        this.days.push(dayobject) // 将日期放入data 中的days数组 供页面渲染使用
      }
      // 其他周
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)
        let dayobject = {}
        dayobject.day = d
        this.days.push(dayobject)
      }
    },
    pickPre: function(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickYear: function(year, month) {
      alert(year + ',' + month)
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      var y = year
      var m = month
      if (m < 10) m = '0' + m
      var d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    },

    handleSelect(dayobject) {
      let value = dayobject
      let index = this.days.indexOf(value)
      value.isSelect = true
      this.days[index] = value
      // 存一下vuex
      if (this.deskBookDate.length === 0) {
        let aa = []
        aa.push(dayobject)
        this.setdeskBookDate(aa)
      } else if (this.deskBookDate.length === 1) {
        let aaa = []
        aaa.push(dayobject)
        if (dayobject.day > this.deskBookDate[0].day) {
          this.setdeskBookDate([...this.deskBookDate, ...aaa])
        } else {
          this.setdeskBookDate([...aaa, ...this.deskBookDate])
        }

        for (let i = 0; i < this.days.length; i++) {
          let first = this.deskBookDate[0].day
          let last = this.deskBookDate[1].day
          if (this.days[i].day > first && this.days[i].day < last) {
            this.days[i].isSelect = true
          }
        }
      } else {
        this.setdeskBookDate([])
        this.days.forEach(element => {
          element.isSelect = false
        })
      }
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="less" scoped>
.selectBookTime-calendar {
  width: 98%;
  margin: 0 auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  .month {
    width: 100%;
    background: #1978fe;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    list-style-type: none;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }

  .arrow {
    padding: 30px;
  }

  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
    color: white;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #1978fe;
    display: flex;
    flex-wrap: wrap;
    color: #ffffff;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 14.2%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #ffffff;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .days li {
    list-style-type: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 14.2%;
    height: 70px;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
    span {
      font-size: 24px;
      color: #000;
    }
    &.isSelect {
      background-color: #00aeff;
      span {
        color: #ffffff;
      }
    }
  }

  .days li .active {
    // color: #00aaff;
  }

  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }
}
</style>
