<template>
  <div class="detail-meet">
    <x-header :left-options="{backText: ''}">会议详情</x-header>
    <div class="detail-meet-main">
      <div class="detail-meet-content">
        <div class="detail-meet-up">
          <qrcode :value="detail.token"
                  type="img"
                  class="haha"
                  :size="160"></qrcode>
        </div>
        <div class="detail-meet-down">
          <div class="detail-meet-down-inner">
            <h3 class="detail-meet-title">{{detail.subject}}</h3>
            <div class="detail-meet-down-left">
              <div class="detail-meet-time">
                <i class="icon iconfont icon-clock"></i><span>{{detail.startTime}}-{{detail.endTime}}</span></div>
              <div class="detail-meet-location">
                <i class="icon iconfont icon-location"></i>
                <span>{{roomMenu[detail.room-1]}}</span>
                <span class="detail-meet-location-direct">导航</span>
              </div>
              <div class="detail-meet-personList">
                <i class="icon iconfont icon-man"></i>
                <span>{{detail.participants}}</span>
              </div>
            </div>
            <Clock :time="detail.startTime"
                   :size="clockSize"></Clock>
          </div>
        </div>
      </div>
      <div class="detail-meet-light">
        <div class="detail-meet-light-title">会议室顶灯</div>
        <input class='switch-component'
               type='checkbox'
               v-model="lightState"
               @change="handleLight"
               :disabled="isUseful">
      </div>
    </div>
  </div>
</template>
<script>
import { Qrcode } from 'vux'
import Clock from '@/components/Clock'
import { mapGetters } from 'vuex'
import { lightControl } from '@/api/'
import moment from 'moment'

export default {
  name: 'DetailMeet',
  components: {
    Clock,
    Qrcode
  },
  data() {
    return {
      clockSize: '96px',
      roomMenu: ['会议室1', '会议室2', '会议室3'],
      lightState: true,
      timeIndex: this.$route.query.fIndex,
      dataIndex: this.$route.query.cIndex
    }
  },
  filters: {
    exchange: function(value) {
      return value.split(',')
    }
  },
  methods: {
    async handleLight() {
      let params = new URLSearchParams()
      params.append(
        'room',
        this.showData[this.timeIndex].data[this.dataIndex].room
      )
      params.append('method', this.lightState ? 'Open' : 'Close')
      let responseValue = await lightControl(params)
      console.log(responseValue)
    }
  },
  computed: {
    ...mapGetters('meeting', {
      meetingData: 'showData'
    }),
    isUseful() {
      // 已完成
      if (this.tabIndex === 1) {
        return true
      }
      // 当前时间段
      const date = moment(this.showData[this.timeIndex].day).format('YYYY-MM-DD')
      const startMeetingTime = this.showData[this.timeIndex].data[this.dataIndex].startTime
      const endMeetingTime = this.showData[this.timeIndex].data[this.dataIndex].endTime
      if (
        moment().isBefore(`${date} ${endMeetingTime}`) &&
        moment().isAfter(`${date} ${startMeetingTime}`)
      ) {
        return false
      }
      return true
    },
    showData() {
      return this.meetingData(this.$route.query.tabIndex)
    },
    detail() {
      let detailData = {}
      detailData.day = this.showData[this.timeIndex].day
      Object.assign(
        detailData,
        this.showData[this.timeIndex].data[this.dataIndex]
      )
      return detailData
    }
  }
}
</script>
<style lang="less" scoped>
.detail-meet {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(-10deg, #05327b 0%, #105ab6 100%),
    linear-gradient(#e9e9e9, #e9e9e9);
  background-blend-mode: normal, normal;
  .detail-meet-main {
    width: 100%;
    height: calc(100% - 46px);
    .detail-meet-content {
      width: 686px;
      height: 894px;
      margin: 60px auto;
      background: #ffffff;
      .detail-meet-up {
        height: 444px;
        border: 1px dotted #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .detail-meet-down {
        height: 450px;
        display: flex;
        justify-content: center;
        align-items: center;
        .detail-meet-down-inner {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          width: 558px;
          height: 387px;
          .detail-meet-title {
            width: 100%;
            padding: 55px 0 20px 0;
            font-family: PingFangSC-Medium;
            font-size: 38px;
            font-weight: 700;
            letter-spacing: 0px;
            color: #333333;
            border-bottom: 1px solid #cccccc;
            margin-bottom: 20px;
          }
          .detail-meet-down-left {
            flex-grow: 1;
            width: calc(100% - 96px);
            & > div {
              text-align: left;
              font-family: PingFangSC-Medium;
              font-size: 32px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 39px;
              letter-spacing: 0px;
              color: #333333;
              padding: 10px 0;
              span {
                margin-left: 10px;
              }
              .icon {
                font-size: 32px;
                color: #cecece;
              }
              .detail-meet-location-direct {
                width: 62px;
                height: 30px;
                font-size: 32px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 39px;
                letter-spacing: 0px;
                color: #366bfd;
              }
            }
          }
        }
      }
    }

    .detail-meet-light {
      background-color: #ffffff;
      width: 686px;
      height: 124px;
      margin: 10px auto;
      border-radius: 10px;
      display: flex;
      .detail-meet-light-title {
        height: 37px;
        font-size: 38px;
        line-height: 38px;
        letter-spacing: 0px;
        color: #333333;
      }
      justify-content: space-around;
      align-items: center;
    }
  }
}
/*switch start*/
.switch-component {
  position: relative;
  width: 120px;
  height: 56px;
  background-color: #dadada;
  border-radius: 56px;
  border: none;
  outline: none;
  -webkit-appearance: none;
  transition: all 0.2s ease;
}

// 按钮
.switch-component::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.2s ease;
}

// checked状态时，背景颜色改变
.switch-component:checked {
  background-color: #05327b;
}

// checked状态时，按钮位置改变
.switch-component:checked::after {
  left: 50%;
}
/*switch end*/
</style>
