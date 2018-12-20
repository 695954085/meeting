<template>
  <div class="addMeet">
    <x-header :left-options="{backText: '',preventGoBack:true}"
              @on-click-back="handleReturn">会议室预约
      <a slot="right"
         @click="handleComplate">完成</a>
    </x-header>
    <group>
      <x-input title="会议主题"
               v-model="subject"
               placeholder="请输入会议主题"
               placeholder-align="right"
               text-align="right"
               required></x-input>
      <cell @click.native="handleSelectRoom"
            title="会议室"
            :value="roomValue"
            align-items="flex-start"
            value-align="right"
            is-link>
      </cell>
      <cell @click.native="handleSelectTime"
            title="会议时间"
            align-items="flex-start"
            :value="timeValue"
            value-align="right"
            is-link>
      </cell>
      <cell @click.native="handleSelectPerson"
            title="参会人员"
            align-items="flex-start"
            :value="personValue"
            value-align="right"
            is-link>
      </cell>
    </group>
    <actionsheet v-model="show1"
                 :menus="roomMenu"
                 @on-click-menu="handlePickRoom"></actionsheet>
  </div>
</template>
<script>
import { Actionsheet, Cell } from 'vux'
import { mapMutations, mapState } from 'vuex'
import { bookMeeting } from '@/api/'
import { vuxInfo } from '@/utils/alert.js'
export default {
  name: 'AddMeet',
  components: {
    Actionsheet,
    Cell
  },
  data () {
    return {
      show1: false,
      roomMenu: ['会议室1', '会议室2', '会议室3']
    }
  },
  methods: {
    ...mapMutations('meeting', [
      'setbookLocation',
      'setbookPersonList',
      'setbookTitle',
      'clearbookTime'
    ]),
    handleReturn () {
      this.$router.push(`/meeting`)
    },
    async handleComplate () {
      let params = new URLSearchParams()
      // 提交之前校验一下
      if (this.subject.trim() === '') {
        vuxInfo(this, '请先输入会议主题')
        return
      }
      if (this.bookLocation === 0) {
        vuxInfo(this, '请先选择会议室')
        return
      }
      let comitDay =
        this.currentday.year +
        '/' +
        this.currentday.month +
        '/' +
        this.currentday.day
      // 可以提前半个小時
      let limitTime
      let timeArr = this.bookTime.startTime.split(':')
      if (parseInt(timeArr[1]) === 0) {
        limitTime = timeArr[0] + ':30'
      } else {
        let temp = parseInt(timeArr[0]) + 1
        limitTime = temp + ':00'
      }
      let myTime = `${comitDay} ${limitTime}`
      let current = new Date()
      var compareData = new Date(Date.parse(myTime))
      if (compareData < current) {
        vuxInfo(this, '该时间段不合法,选择正确时间段')
        return
      }

      let comitPersonList = this.exchangPersonList()
      if (comitPersonList === '请选择') {
        vuxInfo(this, '参会人员不能为空,请选择')
        return
      }
      params.append('subject', this.subject)
      params.append('room', this.bookLocation)
      params.append('bookDate', comitDay)
      params.append('startTime', this.bookTime.startTime)
      params.append('endTime', this.bookTime.endTime)
      params.append('participants', comitPersonList)
      let responseValue = await bookMeeting(params)
      let { data, status } = responseValue
      if (status !== 200) {
        vuxInfo(this, '请求异常')
      } else {
        console.log(data.status + data.msg)
        // 成功提交
        if (data.status === 'success') {
          vuxInfo(this, '恭喜你，预约成功orz~~')
          this.subject = ''
          this.setbookLocation(0)
          this.clearbookTime()
          this.setbookPersonList([])
          this.$router.push(`/meeting`)
        } else {
          vuxInfo(this, data.msg)
        }
      }
    },
    exchangPersonList () {
      let returnValue = '请选择'
      if (this.bookPersonList.length !== 0) {
        returnValue = ''
        this.bookPersonList.forEach(element => {
          returnValue += element + ','
        })
        returnValue = returnValue.substring(0, returnValue.length - 1)
      }
      return returnValue
    },
    handleSelectRoom () {
      this.show1 = true
    },
    handlePickRoom (index) {
      this.setbookLocation(index + 1)
    },
    handleSelectTime () {
      // 没有选择地点直接进入时默认选择第一项
      if (this.bookLocation === 0) {
        this.setbookLocation(1)
      }
      this.$router.push(`/selectTime`)
    },
    handleSelectPerson () {
      this.$router.push(`/selectPerson`)
    }
  },
  computed: {
    ...mapState('meeting', [
      'bookPersonList',
      'bookTime',
      'currentday',
      'bookLocation',
      'bookTitle'
    ]),
    subject: {
      get () {
        return this.bookTitle
      },
      set (val) {
        this.setbookTitle(val)
      }
    },
    personValue: function () {
      let returnValue = this.exchangPersonList()
      return returnValue
    },
    timeValue: function () {
      let returnValue = '请选择'
      if (this.bookTime.startTime && this.bookTime.endTime) {
        returnValue =
          '周' +
          this.currentday.week +
          '(' +
          this.currentday.month +
          '/' +
          this.currentday.day +
          ')'
        returnValue += this.bookTime.startTime + '-' + this.bookTime.endTime
      }
      return returnValue
    },
    roomValue: function () {
      if (this.bookLocation === 0) {
        return '请选择'
      }
      return this.roomMenu[this.bookLocation - 1]
    }
  }
}
</script>
<style lang="less">
.addMeet {
  .vux-cell-bd p {
    text-align: left;
    padding-left: 10px;
  }
}
</style>
