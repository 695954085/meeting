<template>
  <div class="deskList">
    <div class="deskBook-card"
         v-for="item in deskBookRecord"
         :key="item.id">
      <div class="deskBook-body"
           :class="{occupy: parseInt(item.occupy)===1?true:false}">
        <div class="deskBook-body-left">
          <div class="deskBook-body-desk">{{deskNumber[parseInt(item.station)-1]}}</div>
          <div class="deskBook-body-time">{{item.startTime}}-{{item.endTime}}</div>
          <div class="deskBook-body-state">{{deskState[parseInt(item.occupy)]}}</div>
        </div>
        <i class="iconfont icon-yizi"></i>
      </div>
      <div class="deskBook-footer">
        <div class="deskBook-footernavigation">导航</div>
        <div class="deskBook-footerchageState"
             @click="handleClick(item.id,item.occupy)">{{deskStateText[parseInt(item.occupy)]}}</div>
      </div>
    </div>
    <div class="deskBook-card-add"
         @click="deskBookAdd">
      <div class="deskBook-card-add-cont">
        <x-icon type="ios-plus-empty"
                size="100"
                class="deskBook-plus"></x-icon>
        <div class="deskBook-card-text">新增工位预约</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { getDeskList, releaseDesk, updateDeskState } from '@/api/'
import { vuxInfo } from '@/utils/alert.js'
export default {
  name: 'DeskList',
  data() {
    return {
      deskState: ['未使用', '使用中'],
      deskStateText: ['开始使用', '提前释放'],
      deskNumber: ['1号工位', '2号工位', '3号工位', '4号工位']
    }
  },
  async mounted() {
    let responseValue
    try {
      responseValue = await getDeskList(this.user.usercard)
    } catch (err) {
      vuxInfo(this, err)
      return
    }
    console.log(responseValue)
    let { status, data } = responseValue
    if (status !== 200) {
      vuxInfo(this, '请求异常')
    } else {
      this.setdeskBookRecord(data)
    }
  },
  computed: {
    ...mapState('workarea', ['deskBookRecord']),
    ...mapState('meeting', ['user'])
  },
  methods: {
    ...mapMutations('workarea', ['setdeskBookRecord']),
    deskBookAdd() {
      this.$router.push(`/addDesk`)
    },
    async handleClick(id, occupy) {
      if (occupy === 0) {
        // eslint-disable-next-line
        // cordova.plugins.barcodeScanner.scan(
        //   result => {
        //     console.log(`barcode${result.text}`)
        //     console.log(`barcode${result.format}`)
        //     console.log(`barcode${result.cancelled}`)
        //     // 要用promise实现同步
        //     if (!result.cancelled) {
        //       try {
        //         let aaa = this.updateDeskState(
        //           result.text,
        //           this.user.usercard
        //         )
        //       } catch (err) {
        //         vuxInfo(this, err)
        //       }
        //     }
        //   },
        //   error => {
        //     vuxInfo(this, 'Scanning failed: ' + error)
        //   }
        // )
      } else {
        // index === 1的情况
        let responseValue
        try {
          responseValue = await releaseDesk(id)
        } catch (err) {
          vuxInfo(this, err)
          return
        }
        const { status, data } = responseValue
        if (status !== 200) {
          vuxInfo(this, '服务器异常')
        } else {
          if (data.status === 'success') {
            vuxInfo(this, '释放成功', () => {
              // 释放之后要做啥？？
            })
          } else {
            vuxInfo(this, data.msg)
          }
        }
        console.log(responseValue)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.deskList {
  height: 100%;
  overflow: auto;
  .deskBook-card {
    width: 686px;
    height: 306px;
    border-radius: 12px;
    margin: 0 auto;
    padding: 20px 0;
    .deskBook-body {
      &.occupy {
        background-image: linear-gradient(-45deg, #fe7d46 1%, #fe994e 100%),
          linear-gradient(#ffffff, #ffffff);
        background-blend-mode: normal, normal;
        .icon-yizi {
          color: #fc6822;
        }
      }
      width: 686px;
      height: 226px;
      background-image: linear-gradient(-45deg, #5060fe 1%, #409cfc 100%),
        linear-gradient(#ffffff, #ffffff);
      display: flex;
      justify-content: space-around;
      align-items: center;
      .deskBook-body-left {
        text-align: left;
        .deskBook-body-desk {
          font-family: PingFangSC-Medium;
          font-size: 36px;
          font-weight: normal;
          color: #ffffff;
        }
        .deskBook-body-time {
          font-family: PingFangSC-Regular;
          font-size: 30px;
          font-weight: normal;
          color: #ffffff;
        }
        .deskBook-body-state {
          font-family: PingFangSC-Regular;
          font-size: 30px;
          font-weight: normal;
          color: #ffffff;
        }
      }
      .icon-yizi {
        font-size: 184px;
        color: #2942f1;
      }
    }
    .deskBook-footer {
      width: 686px;
      height: 80px;
      background-color: #ffffff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      font-weight: normal;
      color: #366bfd;
    }
  }
  .deskBook-card-add {
    width: 686px;
    height: 306px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    border: solid 2px #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .deskBook-card-add-cont {
      .deskBook-plus {
        fill: #cccccc;
      }
      .deskBook-card-text {
        font-family: PingFangSC-Medium;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 39px;
        letter-spacing: 0px;
        color: #a6a6a6;
      }
    }
  }
}
</style>
