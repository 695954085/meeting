<template>
  <div class="deskList">
    <div class="deskBook-card"
         v-for="(item,index) in bookRecord"
         :key="index">
      <div class="deskBook-body">
        <div class="deskBook-body-left">
          <div class="deskBook-body-desk">{{item.deskNumber}}</div>
          <div class="deskBook-body-time">{{item.deskDate}}</div>
          <div class="deskBook-body-state">{{item.deskState}}</div>
        </div>
        <i class="iconfont icon-yizi"></i>
      </div>
      <div class="deskBook-footer">
        <div class="deskBook-footernavigation">导航</div>
        <div class="deskBook-footerchageState"
             @click="handleClick">开始使用</div>
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
export default {
  name: 'DeskList',
  data() {
    return {
      bookRecord: [
        {
          deskNumber: '5号工位',
          deskDate: '2018.12.03-12.06(3天)',
          deskState: '使用中'
        },
        {
          deskNumber: '4号工位',
          deskDate: '2018.12.03-12.06(3天)',
          deskState: '未使用'
        }
      ]
    }
  },
  methods: {
    deskBookAdd() {
      this.$router.push(`/addDesk`)
    },
    handleClick: function() {
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          alert(
            'We got a barcode\n' +
              'Result: ' +
              result.text +
              '\n' +
              'Format: ' +
              result.format +
              '\n' +
              'Cancelled: ' +
              result.cancelled
          )
        },
        function(error) {
          alert('Scanning failed: ' + error)
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
.deskList {
  .deskBook-card {
    width: 686px;
    height: 306px;
    border-radius: 12px;
    margin: 0 auto;
    padding: 20px 0;
    .deskBook-body {
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
