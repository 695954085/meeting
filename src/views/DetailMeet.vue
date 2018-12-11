<template>
  <div class="detail-meet">
    <x-header :left-options="{backText: ''}">会议详情</x-header>
    <div class="detail-meet-main">
      <div class="detail-meet-content">
        <div class="detail-meet-up">
          <qrcode :value="detail.token"
                  type="img"
                  size="260"></qrcode>
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
                <!-- <span v-for="(item,index) in detail.paticipants|exchange"
                      :key="index">{{item}},</span> -->
              </div>
            </div>
            <Clock :time="detail.startTime"
                   :size="clockSize"></Clock>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Qrcode } from 'vux'
import Clock from '@/components/Clock'
import { mapState } from 'vuex'
export default {
  name: 'DetailMeet',
  components: {
    Clock,
    Qrcode
  },
  data () {
    return {
      clockSize: '96px',
      roomMenu: ['会议室1', '会议室2', '会议室3']
    }
  },
  filters: {
    exchange: function (value) {
      return value.split(',')
    }
  },
  computed: {
    ...mapState(['detailCount', 'meetingData']),
    detail: function () {
      let detailData = {}
      let timeIndex = this.detailCount.timeIndex
      let dataIndex = this.detailCount.dataIndex
      detailData.day = this.meetingData[timeIndex].day
      Object.assign(detailData, this.meetingData[timeIndex].data[dataIndex])
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
    display: flex;
    justify-content: center;
    align-items: center;
    .detail-meet-content {
      width: 686px;
      height: 894px;
      background: #ffffff;
      .detail-meet-up {
        height: 360px;
        border: 1px dotted #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 260px;
          height: 260px;
        }
      }
      .detail-meet-down {
        height: 534px;
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
  }
}
</style>
