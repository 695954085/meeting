<template>
  <div class="deskList">
    <div class="deskBook-card"
         v-for="item in getDeskBookList"
         :key="item.id">
      <div class="deskBook-body"
           :class="{occupy: parseInt(item.occupy)===1?true:false}">
        <div class="deskBook-body-left">
          <div class="deskBook-body-desk">{{deskNumber[parseInt(item.station)-1]}}</div>
          <div class="deskBook-body-time"><i class="iconfont icon-clock"></i>{{item.startTime}}-{{item.endTime}}</div>
          <div class="deskBook-body-state"><i class="iconfont icon-location"></i>{{deskState[parseInt(item.occupy)]}}</div>
        </div>
        <i class="iconfont icon-chair"></i>
      </div>
      <div class="deskBook-footer">
        <div class="deskBook-footernavigation" @click="toRoomMap(item.station)">导航<i class="iconfont icon-navigation"></i></div>
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
    this.queryDataList()
  },
  computed: {
    ...mapState('workarea', ['deskBookRecord']),
    ...mapState('meeting', ['user']),
    getDeskBookList() {
      let data = this.deskBookRecord.filter(character => character.state === '1')
      return data
    }
  },
  methods: {
    ...mapMutations('workarea', ['setdeskBookRecord']),
    toRoomMap(value) {
      this.$emit('ee', value)
    },
    async queryDataList () {
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
    deskBookAdd() {
      this.$router.push(`/addDesk`)
    },
    async handleClick(id, occupy) {
      if (occupy === '0') {
        cordova.plugins.barcodeScanner.scan(
          async (result) => {
            console.log(`barcode${result.text}`)
            console.log(`barcode${result.format}`)
            console.log(`barcode${result.cancelled}`)
            if (!result.cancelled) {
              try {
                let responseValue = await updateDeskState(
                  result.text,
                  this.user.usercard
                )
                console.log(responseValue)
                let { status, data } = responseValue
                if (status !== 200) {
                  vuxInfo(this, '请求异常')
                } else {
                  vuxInfo(this, data.msg, () => {
                    this.queryDataList()
                  })
                }
              } catch (err) {
                console.log('fetch error:' + err)
                vuxInfo(this, err)
              }
            }
          },
          (error) => {
            vuxInfo(this, 'Scanning failed: ' + error)
          },
          {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: false, // iOS and Android
            showTorchButton: false, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt: '请对准工位二维码进行扫描', // Android
            resultDisplayDuration: 300, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: 'QR_CODE', // default: all but PDF_417 and RSS_EXPANDED
            orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS and Android
          }
        )
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
          if (data === 'success') {
            vuxInfo(this, '释放成功', () => {
              this.queryDataList()
            })
          } else {
            vuxInfo(this, '释放失败')
          }
        }
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
        .icon-chair {
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
        .iconfont{
          font-size: 30px;
          margin-right: 10px;
        }
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
      .icon-chair {
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
      .deskBook-footernavigation{
        .icon-navigation{
          margin-left: 6px;
          font-size: 28px;
        }
      }
    }
  }
  .deskBook-card-add {
    width: 686px;
    height: 306px;
    margin: 32px 32px 60px 32px;
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
