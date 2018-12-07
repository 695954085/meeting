<template>
  <div class="addMeet">
    <x-header :left-options="{backText: ''}">会议室预约<a slot="right">完成</a></x-header>
    <group>
      <x-input title="会议主题"
               placeholder="请输入会议主题"></x-input>
      <cell @click.native="handleSelectRoom"
            title="会议室"
            align-items="flex-start"
            :value="roomValue"
            value-align="left"
            is-link>
      </cell>
      <cell @click.native="handleSelectTime"
            title="会议时间"
            align-items="flex-start"
            :value="timeValue"
            value-align="left"
            is-link>
      </cell>
      <cell @click.native="handleSelectPerson"
            title="参会人员"
            align-items="flex-start"
            :value="personValue"
            value-align="left"
            is-link>
      </cell>
    </group>
    <actionsheet v-model="show1"
                 :menus="menus1"
                 @on-click-menu="handlePickRoom"></actionsheet>
  </div>
</template>
<script>
import { Actionsheet, Cell } from 'vux'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'AddMeet',
  components: {
    Actionsheet, Cell
  },
  data () {
    return {
      show1: false,
      menus1: ['会议室1', '会议室2', '会议室3'],
      selectRoom: '请选择',
      roomValue: '请选择',
      timeValue: '请选择'
      // personValue: '请选择'

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
  },
  computed: {
    ...mapState(['bookPersonList']),
    personValue: function () {
      let returnValue = '请选择'
      if (this.bookPersonList.length !== 0) {
        returnValue = ''
        this.bookPersonList.forEach(element => {
          returnValue += ' ' + element
        })
      }
      return returnValue
    }
  }

}
</script>
