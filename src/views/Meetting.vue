<template>
  <div class="meetting">
    <x-header :left-options="{backText: '首页'}">
      <span>会议管理</span>
      <x-icon slot="right"
              type="ios-plus-empty"
              size="35"
              style="fill:#fff;position:relative;top:-8px;right:-3px;"
              @click.native="handleAddMeetting"></x-icon>
    </x-header>
    <div v-for="(item,index) in loadData"
         :key="index"
         class="item-block">
      <h3 class="item-block-time">{{item.time}}</h3>
      <div v-for="(mItem,mIndex) in item.meettingData"
           :key="mIndex"
           class="meetting-blo"
           @click="toMeetDetail">
        <Clock :time="mItem.time"
               :size="clockSize"></Clock>
        <div class="meetting-blo-right">
          <h4 class="meetting-blo-title">{{mItem.title}}</h4>
          <div class="meetting-blo-tandl">
            <span class="meetting-blo-time">{{mItem.time}}</span>
            <span class="meetting-blo-location">{{mItem.location}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader, Cell } from 'vux'
import Clock from '@/components/Clock'
export default {
  name: 'Meetting',
  components: {
    XHeader, Cell, Clock
  },
  data () {
    return {
      'clockSize': '96px',
      loadData: [{
        'time': '2018-11-21',
        'meettingData': [
          { title: 'ITIL项目例会', time: '10:00-11:00', location: '会议室1', person: 'a,b,c' },
          { title: 'CMDB项目例会', time: '14:00-15:00', location: '会议室3', person: 'a,b,c' }] }
      ]
    }
  },
  methods: {
    handleAddMeetting () {
      this.$router.push(`/addMeet`)
    },
    toMeetDetail () {
      this.$router.push(`/detailMeet`)
    }
  }
}
</script>
<style lang="less" scoped>
.item-block {
  .item-block-time {
    width: 255px;
    height: 29px;
    font-family: PingFangSC-Regular;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 39px;
    letter-spacing: 0px;
    color: #888888;
  }
  .meetting-blo {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    width: 750px;
    height: 136px;
    background-color: #ffffff;
    .meetting-blo-right {
      flex-grow: 1;
      .meetting-blo-title {
        text-align: left;
        height: 35px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 39px;
        letter-spacing: 0px;
        color: #333333;
      }
      .meetting-blo-tandl{
        text-align: left;
      }
      .meetting-blo-time {
        text-align: left;
        height: 23px;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 39px;
        letter-spacing: 0px;
        color: #888888;
        width: 159px;
        height: 23px;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 39px;
        letter-spacing: 0px;
        color: #888888;
      }
      .meetting-blo-location {
        width: 107px;
        height: 29px;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 39px;
        letter-spacing: 0px;
        color: #888888;
      }
    }
  }
}
</style>
