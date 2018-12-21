<template>
  <div class="selectDesk">
    <x-header :left-options="{backText: ''}">工位选择
      <a slot="right"
         @click="handleComplate">确定</a>
    </x-header>
    <div class="selectDesk-main">
      <div class="desk-image-wrap">
        <img src="../../assets/images/desk-map.png"
             alt="">
        <div class="selectDesk-seat-main">
          <div class="selectDesk-seat-item"
               v-for="(item,index) in deskBookSeatData"
               :key="index"
               @click="handleSelect(index)"
               :class="{isActive: item.isActive,
             isAble: !item.isAble}"><span>{{item.name}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { getDeskState } from '@/api/'
import Time from '@/utils/time.js'
import { vuxInfo } from '@/utils/alert.js'
export default {
  name: 'SelectDesk',
  data() {
    return {}
  },
  async mounted() {
    if (this.deskBookDate === undefined || this.deskBookDate.length === 0) {
      vuxInfo(this, '请先选择预定时间', () => {
        this.$router.push('/addDesk')
      })
      return
    }
    let start = Time.getFormatDateString(this.deskBookDate[0].day, '/')
    let end = Time.getFormatDateString(this.deskBookDate[1].day, '/')
    let responseValue = await getDeskState(start, end)
    console.log(responseValue)
    let { status, data } = responseValue
    if (status !== 200) {
      vuxInfo(this, '请求异常')
    } else {
      this.restoreDeskBookSeatData()
      this.setunableBookSeatData(data)
    }
  },
  computed: {
    ...mapState('workarea', [
      'deskSeatCertain',
      'deskBookSeatData',
      'deskBookDate'
    ])
  },
  methods: {
    ...mapMutations('workarea', [
      'setdeskBookSeatData',
      'setunableBookSeatData',
      'restoreDeskBookSeatData',
      'setdeskSeatCertain'
    ]),
    handleSelect(index) {
      if (this.deskBookSeatData[index].isAble === false) {
        return
      }
      let dataList = this.deskBookSeatData
      dataList.forEach(element => {
        element.isActive = false
      })
      dataList[index].isActive = true
      this.setdeskBookSeatData(dataList)
    },
    handleComplate() {
      this.setdeskSeatCertain(true)
      this.$router.push(`/addDesk`)
    }
  }
}
</script>
<style lang="less" scoped>
.selectDesk {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .selectDesk-main {
    width: 100%;
    height: calc(100% - 46px);
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    .desk-image-wrap {
      position: relative;
      img {
        width: 750px;
        height: 1215px;
      }
      .selectDesk-seat-main {
        position: absolute;
        right: 65px;
        top: 1000px;
        height: 0;
        display: flex;
        .selectDesk-seat-item {
          height: 148px;
          line-height: 40px;
          width: 97px;
          background: url('../../assets/images/empty-desk.png') no-repeat;
          background-size: contain;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          span {
            font-family: PingFangSC-Regular;
            font-size: 30px;
            font-weight: normal;
            color: #333333;
          }
          &.isActive {
            background: url('../../assets/images/select-desk.png') no-repeat;
            background-size: contain;
          }
          &.isAble {
            background: url('../../assets/images/unable-desk.png') no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
}
</style>
