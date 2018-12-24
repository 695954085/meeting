<template>
  <div class="addDesk">
    <x-header :left-options="{backText: '',preventGoBack:true}"
              @on-click-back="backToDesk">新增工位预约
      <a slot="right"
         @click="handleComplate">完成</a>
    </x-header>
    <group>
      <cell @click.native="handleSelectTime"
            title="使用日期"
            align-items="flex-start"
            :value="timeValue"
            value-align="right"
            is-link>
      </cell>
      <cell @click.native="handleSelectDesk"
            title="工位选择"
            align-items="flex-start"
            :value="deskValue"
            value-align="right"
            is-link>
      </cell>
    </group>
    <div class="adddesk-show-calendar"
         v-if="showCalendar"
         @click="cancelTime">
      <div class="adddesk-show-bottom">
        <div class="adddesk-show-title">
          <div class="adddesk-show-certain"
               @click.stop="cancelTime">取消</div>
          <div>选择预约使用工位日期</div>
          <div class="adddesk-show-cancel"
               @click.stop="certainTime">确定</div>
        </div>
        <Calendar></Calendar>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from '@/components/Calendar'
import { Actionsheet, Cell } from 'vux'
import { mapMutations, mapState } from 'vuex'
import { vuxInfo } from '@/utils/alert.js'
import { bookStation } from '@/api/'
import Time from '@/utils/time.js'
import moment from 'moment'
export default {
  name: 'AddDesk',
  components: {
    Actionsheet,
    Cell,
    Calendar
  },
  data() {
    return {
      demo3: [],
      showCalendar: false
    }
  },
  methods: {
    ...mapMutations('workarea', [
      'setdeskBookDateCertain',
      'setdeskBookDate',
      'restoreDeskBookSeatData'
    ]),
    handleReturn() {},
    handleSelectDesk() {
      this.$router.push(`/selectDesk`)
    },
    handleSelectTime() {
      this.showCalendar = true
      this.setdeskBookDateCertain(false)
      // 清除日历选中状态
      this.setdeskBookDate([])
    },
    getStationValue() {
      if (!this.deskSeatCertain) {
        // 没有确认座位的时候不执行并清空数据
        this.restoreDeskBookSeatData()
        return ''
      }
      let selectOne = this.deskBookSeatData.find(
        character => character.isActive === true
      )
      if (selectOne === undefined || Object.keys(selectOne).length === 0) {
        return ''
      }
      let index = this.deskBookSeatData.indexOf(selectOne) + 1
      return index.toString()
    },
    certainTime() {
      // 这里需要校验一下选择时间是否合法
      let start = Time.getFormatDateString(this.deskBookDate[0].day, '-')
      if (moment().isBefore(start) || moment().isSame(start, 'day')) {
        this.showCalendar = false
        this.setdeskBookDateCertain(true)
      } else {
        vuxInfo(this, '选择时间不合法，请重新选择', () => {
          this.cancelTime()
        })
      }
    },
    cancelTime() {
      this.showCalendar = false
      this.setdeskBookDate([])
    },
    async handleComplate() {
      let responseValue
      try {
        let start = Time.getFormatDateString(this.deskBookDate[0].day, '/')
        let end = Time.getFormatDateString(this.deskBookDate[1].day, '/')
        let station = this.getStationValue()
        const params = new URLSearchParams()
        params.append('userCard', this.user.usercard)
        params.append('station', station)
        params.append('startTime', start)
        params.append('endTime', end)
        responseValue = await bookStation(params)
        console.log(responseValue)
      } catch (err) {
        vuxInfo(this, err)
        return
      }
      const { status, data } = responseValue
      if (status !== 200) {
        vuxInfo(this, '服务器异常')
      } else {
        if (data.status === 'success') {
          vuxInfo(this, '预定工位成功', () => {
            // 清空预定时间
            this.setdeskBookDate([])
            this.restoreDeskBookSeatData()
            this.$router.push(`/deskBook`)
          })
        } else {
          vuxInfo(this, data.msg)
        }
      }
      // this.$router.push(`/deskBook`)
    },
    backToDesk() {
      this.$router.push(`/deskBook`)
      // 清除预定的记录
    }
  },
  computed: {
    ...mapState('meeting', ['user']),
    ...mapState('workarea', [
      'deskBookDate',
      'deskBookSeatData',
      'deskBookDateCertain',
      'deskSeatCertain'
    ]),
    deskValue: function() {
      return this.getStationValue()
    },
    timeValue: function() {
      if (this.deskBookDateCertain) {
        if (this.deskBookDate.length === 2) {
          let start = Time.getFormatDateString(this.deskBookDate[0].day, '.')
          let end = Time.getFormatDateString(this.deskBookDate[1].day, '.')
          return `${start}-${end}`
        }
      }
      return ''
    }
  }
}
</script>
<style lang="less">
.addDesk {
  .vux-cell-bd p {
    text-align: left;
    padding-left: 10px;
  }
  .adddesk-show-calendar {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    display: flex;
    align-items: flex-end;
    background-color: rgba(0, 0, 0, 0.3);
    .adddesk-show-bottom {
      .adddesk-show-title {
        width: 750px;
        height: 100px;
        line-height: 100px;
        background-color: #ffffff;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        font-weight: normal;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .adddesk-show-cancel,
        .adddesk-show-certain {
          float: right;
          color: #fa6017;
          font-size: 28px;
          margin-right: 1%;
        }
      }
      width: 100%;
      background-color: #ffffff;
    }
  }
}
</style>
