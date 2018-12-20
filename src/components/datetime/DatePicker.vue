<template>
  <div class="mdp"
       v-show="isShow">
    <div class="mdp-mask"
         ref="mask"
         :class="{'halfOpacity': isUpdated}"></div>
    <div class="mdp-container"
         :class="{'notTransfrom': isUpdated}">
      <div class="mdp-header">
        {{title}}
      </div>
      <div class="mdp-content">
        <flexbox class="dp-days">
          <flexbox-item v-for="(day, index) in days"
                        :key="'dp-days' + day"
                        :class="['dp-days__item', isHoliday(index) ? 'dp-days__item--isHoliday': '']">
            {{ day }}
          </flexbox-item>
        </flexbox>
        <div class="dp-scroller__container">
          <div class='dp-scroller__content'
               data-scrollable="y">
            <template v-for="(date, index) in dates">
              <div class="calendar__header"
                   :key="'calendar__header' + index">{{ getYearAndMonth(date[7].calendar) }}</div>
              <grid class="calendar__content"
                    :cols='7'
                    :key="'calendar__content' + index"
                    :show-lr-borders='false'
                    :show-vertical-dividers='false'>
                <grid-item v-for="dateItem in date"
                           :key="index + '/' + dateItem.calendar[0] + '/' + dateItem.calendar[1] + '/' + dateItem.calendar[2]"
                           :label='dateItem.current ? dateItem.calendar[2]: ""'
                           :class="dateItem.current ? '' : 'isNotActive'"></grid-item>
              </grid>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EasyScroller from './EasyScroller'
import { Flexbox, FlexboxItem, Grid, GridItem } from 'vux'
import moment from 'moment'

export default {
  data() {
    return {
      days: ['日', '一', '二', '三', '四', '五', '六'],
      // 当前年月日
      currentTime: moment().format('YYYYMMDD'),
      // 选中年月日
      selectedTime: '',
      // 3个月的日期数组
      dates: [],
      isUpdated: false,
      isShow: false
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem
  },
  props: {
    title: {
      type: String,
      default: '选择预约使用工位日期'
    }
  },
  computed: {
    // 当前选中的年月数组
    selectedTimes() {
      // 根据selectedTime得到数组
      return []
    },
    // 当前选择的年月
    selectedYearAndMonth() {
      return !this.selectedTime
        ? moment(this.currentTime, 'YYYYMM').toString()
        : moment(this.selectedTime, 'YYYYMM').toString()
    }
  },
  watch: {
    isShow(nV, oV) {
      this.$nextTick().then(() => {
        this.isUpdated = nV
      })
    }
  },
  methods: {
    isHoliday(index) {
      return [0, 6].some(dayIndex => dayIndex === index)
    },
    // 根据calendar数组得到年月
    getYearAndMonth(calendar) {
      return calendar[0] + '年' + (calendar[1] + 1) + '月'
    },
    // 获取上一个月要补充的moment
    getLastMonthMoments(momentStr, day) {
      const moments = []
      const lastMonthEndDayMoment = moment(momentStr, 'YYYYMMDD')
        .subtract(1, 'month')
        .endOf('month')
      for (let i = 0; i < day; i++) {
        const plainObj = Object.create(null)
        const calendar =
          i === 0
            ? lastMonthEndDayMoment.toArray()
            : lastMonthEndDayMoment.subtract(1, 'day').toArray()
        plainObj['calendar'] = calendar
        plainObj['pre'] = true
        moments.unshift(plainObj)
      }
      return moments
    },
    getNextMonthMoments(momentStr, day) {
      const moments = []
      const nextMonthStartDayMoment = moment(momentStr, 'YYYYMMDD')
        .add(1, 'month')
        .startOf('month')
      for (let i = 0; i < 6 - day; i++) {
        const plainObj = Object.create(null)
        const calendar =
          i === 0
            ? nextMonthStartDayMoment.toArray()
            : nextMonthStartDayMoment.add(1, 'day').toArray()
        plainObj['calendar'] = calendar
        plainObj['next'] = true
        moments.push(plainObj)
      }
      return moments
    }
  },
  created() {
    for (let x = 0; x < 3; x++) {
      const lastDayMoment =
        x === 0
          ? moment().endOf('month')
          : moment()
            .add(x, 'month')
            .endOf('month')
      const lastDay = lastDayMoment.day() // 当月最后一天周几
      const firstDayMoment = lastDayMoment.startOf('month')
      const firstDay = firstDayMoment.day() // 当月第一天周几
      const daysInMonth = firstDayMoment.daysInMonth()
      const lastMonthMoments = this.getLastMonthMoments(
        firstDayMoment.toDate(),
        firstDay
      )
      const nextMonthMoments = this.getNextMonthMoments(
        firstDayMoment.toDate(),
        lastDay
      )
      let momentItems = []
      for (let y = 0; y < daysInMonth; y++) {
        const plainObj = Object.create(null)
        const calendar =
          y === 0
            ? firstDayMoment.toArray()
            : firstDayMoment.add(1, 'day').toArray()
        plainObj['calendar'] = calendar
        plainObj['current'] = true
        momentItems.push(plainObj)
      }
      // 重新装载日期
      momentItems = [...lastMonthMoments, ...momentItems, ...nextMonthMoments]
      this.dates.push(momentItems)
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      const elements = document.querySelectorAll(
        '[data-scrollable],[data-zoomable]'
      )
      let element
      for (let i = 0; i < elements.length; i++) {
        element = elements[i]
        const scrollable = element.attributes.getNamedItem('data-scrollable')
          ? element.attributes.getNamedItem('data-scrollable').value
          : null
        const zoomable = element.attributes.getNamedItem('data-zoomable')
          ? element.attributes.getNamedItem('data-zoomable').value
          : ''
        const zoomOptions = zoomable.split('-')
        const minZoom = zoomOptions.length > 1 && parseFloat(zoomOptions[0])
        const maxZoom = zoomOptions.length > 1 && parseFloat(zoomOptions[1])
        // eslint-disable-next-line
        new EasyScroller(element, {
          scrollingX: scrollable === 'true' || scrollable === 'x',
          scrollingY: scrollable === 'true' || scrollable === 'y',
          zooming: zoomable === 'true' || zoomOptions.length > 1,
          minZoom: minZoom,
          maxZoom: maxZoom
        })
      }
      // 为mask绑定click事件
      this.$refs['mask'].addEventListener('click', () => {
        // 改变状态
        this.isUpdated = false
        setTimeout(() => {
          this.isShow = false
        }, 300)
      })
    })
  }
}
</script>
<style scoped>
.mdp {
  text-align: center;
}
.mdp-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  opacity: 0;
  transition: opacity 0.2s ease-in;
  background-color: #000;
  z-index: 9999;
}
.halfOpacity {
  opacity: 0.5;
}
.mdp-container {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 10000;
  background-color: #fff;
  transition: transform 0.3s ease;
  transform: translateY(100%);
}

.notTransfrom {
  transform: translateY(0);
}
.mdp-header {
  padding: 34px 0;
  font-size: 32px;
}
.dp-days {
  height: 48px;
  background-color: #fbfbfb;
}
.dp-days__item {
  text-align: center;
}
.dp-days__item--isHoliday {
  color: #fa6017;
}
.dp-scroller__container {
  height: 630px;
  overflow: hidden;
}
.dp-scroller__content {
  overflow: hidden;
}
.calendar__header {
  font-size: 28px;
  padding: 18px 0;
  color: #333333;
}
.weui-grid:after {
  border: none;
}
.isNotActive.weui-grid:active {
  background-color: inherit;
}
</style>
