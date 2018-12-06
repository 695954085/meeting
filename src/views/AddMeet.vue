<template>
  <div class="addMeet">
    <x-header :left-options="{backText: ''}">会议室预约<a slot="right">完成</a></x-header>
    <group>
      <x-input title="会议主题"
               placeholder="请输入会议主题"></x-input>
      <x-input title="会议室"
               placeholder="请选择>"
               @on-focus="handleSelectRoom"
               v-model="roomValue"></x-input>
      <x-input title="会议时间"
               placeholder="请选择>"
               @on-focus="handleSelectTime"
               v-model="timeValue"></x-input>
      <x-input title="参会人员"
               placeholder="请选择>"
               @on-focus="handleSelectPerson"
               v-model="personValue"></x-input>
    </group>
    <actionsheet v-model="show1"
                 :menus="menus1"
                 @on-click-menu="handlePickRoom"
                 @on-after-hide="log('after hide')"
                 @on-after-show="log('after show')"></actionsheet>
  </div>
</template>
<script>
import { Actionsheet } from 'vux'

export default {
  name: 'AddMeet',
  components: {
    Actionsheet
  },
  data () {
    return {
      show1: false,
      menus1: ['会议室1', '会议室2', '会议室3']
    }
  },
  methods: {
    handleSelectRoom () {
      this.show1 = true
    },
    handlePickRoom (index) {
      this.roomValue = this.menus1[index]
    },
    handleSelectTime () {
      this.$router.push(`/selectTime`)
    },
    handleSelectPerson () {
      this.$router.push(`/selectPerson`)
    }
  }

}
</script>
