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
         v-if="showCalendar">
      <div class="adddesk-show-bottom">
        <div class="adddesk-show-title">选择预约使用工位日期
          <span class="adddesk-show-certain"
                @click="certainTime">确定</span>
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
    ...mapMutations('workarea', ['setdeskBookDateCertain', 'setdeskBookDate']),
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
    certainTime() {
      this.showCalendar = false
      this.setdeskBookDateCertain(true)
      // if (this.deskBookDate.length === 2) {
      //   let startYear = this.deskBookDate[0].day.getFullYear()
      //   let startMonth = this.deskBookDate[0].day.getMonth() + 1
      //   let startDay = this.deskBookDate[0].day.getDate()
      //   let endYear = this.deskBookDate[1].day.getFullYear()
      //   let endMonth = this.deskBookDate[1].day.getMonth() + 1
      //   let endDay = this.deskBookDate[1].day.getDate()
      //   this.timeValue = `${startYear}.${startMonth}.${startDay}-${endYear}.${endMonth}.${endDay}`
      // }
    },
    handleComplate() {
      console.log('apple')
      // this.$router.push(`/deskBook`)
    },
    backToDesk() {
      this.$router.push(`/deskBook`)
    }
  },
  computed: {
    ...mapState('workarea', [
      'deskBookDate',
      'deskBookSeatData',
      'deskBookDateCertain'
    ]),
    deskValue: function() {
      let selectOne = this.deskBookSeatData.find(
        character => character.isActive === true
      )
      if (selectOne === undefined || Object.keys(selectOne).length === 0) {
        return ''
      }
      let index = this.deskBookSeatData.indexOf(selectOne) + 1
      return index.toString()
    },
    timeValue: function() {
      if (this.deskBookDateCertain) {
        if (this.deskBookDate.length === 2) {
          let startYear = this.deskBookDate[0].day.getFullYear()
          let startMonth = this.deskBookDate[0].day.getMonth() + 1
          let startDay = this.deskBookDate[0].day.getDate()
          let endYear = this.deskBookDate[1].day.getFullYear()
          let endMonth = this.deskBookDate[1].day.getMonth() + 1
          let endDay = this.deskBookDate[1].day.getDate()
          return `${startYear}.${startMonth}.${startDay}-${endYear}.${endMonth}.${endDay}`
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
