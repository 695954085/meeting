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
      <h3>{{item.time}}</h3>
      <div v-for="(mItem,mIndex) in item.meettingData"
           :key="mIndex"
           class="meetting-blo"
           @click="toMeetDetail">
        <Clock :time="mItem.time"></Clock>
        <div class="meetting-blo-right">
          <h4>{{mItem.title}}</h4>
          <div>
            <span>{{mItem.time}}</span>
            <span>{{mItem.location}}</span>
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
      loadData: [{ 'time': '2018-11-21',
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
  .meetting-blo {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .meetting-blo-right {
      flex-grow: 1;
    }
  }
}
</style>
