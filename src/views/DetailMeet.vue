<template>
  <div class="detail-meet">
    <x-header :left-options="{backText: ''}">会议详情</x-header>
    <div class="detail-meet-main">
      <div class="detail-meet-content">
        <div class="detail-meet-up">
          <img src="../assets/tu.png"
               alt="">
        </div>
        <div class="detail-meet-down">
          <div class="detail-meet-down-inner">
            <h3 class="detail-meet-title">{{detail.title}}</h3>
            <div class="detail-meet-down-left">
              <div class="detail-meet-time">{{detail.time}}</div>
              <div class="detail-meet-location">{{detail.location}}</div>
              <div class="detail-meet-personList">{{detail.personList}}</div>
            </div>
            <Clock :time="detail.time"
                   :size="clockSize"></Clock>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Clock from '@/components/Clock'
export default {
  name: 'DetailMeet',
  components: {
    Clock
  },
  data () {
    return {
      detail: {
        title: 'ITIL项目例会',
        time: '10:00-11:00',
        location: '会议室1',
        personList: ['李磊', '王鹏', '李四海']
      },
      clockSize: '96px'
    }
  }
}
</script>
<style lang="less" scoped>
.detail-meet {
  .detail-meet-main {
    width: 750px;
    height: 1344px;
    background-image: linear-gradient(-10deg, #05327b 0%, #105ab6 100%),
      linear-gradient(#e9e9e9, #e9e9e9);
    background-blend-mode: normal, normal;
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
            font-weight: normal;
            // line-height: 39px;
            letter-spacing: 0px;
            color: #333333;
            border-bottom: 1px solid #cccccc;
            margin-bottom: 20px;
          }
          .detail-meet-down-left {
            flex-grow: 1;
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
            }
          }
        }
      }
    }
  }
}
</style>
