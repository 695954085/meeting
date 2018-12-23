<template>
  <div class="roomMap">
    <div
      class="roomMap-dot-outer"
      :style="{top:topValue, left:leftValue}"
    >
      <div class="roomMap-dot-inner">{{position.x + ',' + position.y}}</div>
    </div>
  </div>
</template>
<script>
import { getPosition } from '@/api'
import { vuxInfo } from '@/utils/alert'
export default {
  name: 'RoomMap',
  data() {
    return {
      deviceMap: new Map(),
      topValue: '100px',
      leftValue: '50px',
      position: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    // 开启定位服务
    locatedService() {
      // eslint-disable-next-line
      ble.isEnabled(
        () => {
          // eslint-disable-next-line
          ble.startScanWithOptions([], { reportDuplicates: true }, device => {
            // 放进到deviceMap中
            const { name, id, rssi } = device
            // 排除非183 蓝牙外设
            if (!new RegExp(/\^183\d+$/).test(name)) return
            let deviceList = this.deviceMap.get(name)
            if (!deviceList) {
              deviceList = []
              this.deviceMap.set(name, deviceList)
            }
            deviceList.push({
              name,
              mac: id,
              rssi
            })
            this.deviceMap.set(name, deviceList)
          })
        },
        () => {
          vuxInfo(this, '开启蓝牙权限以及定位权限', () => {
          // eslint-disable-next-line
            ble.enable(
              () => {
                this.locatedService()
              },
              () => {
                this.locatedService()
              }
            )
          })
        }
      )
    },
    // 开启定时服务
    timedTask(timeout = 10000) {
      // 每隔10秒钟请求一次位置
      setTimeout(() => {
        // 判断10秒内，是否满足3个蓝牙设备
        if (!this.isSatisfiedThreeDevice()) {
          this.timedTask(5000)
          return
        }
        // 计算10秒钟内，rssi最强的前三蓝牙设备
        const deviceList = this.computedStrongestSignalDeviceList()
        this.getXY(deviceList)
          .then(response => {
            const { data } = response
            // 实现定位
            this.positioning(data)
            // 清除deviceMap中的所有值
            this.deleteMapValue()
            return this.$nextTick()
          })
          .then(() => {
            // 重新计时
            this.timedTask()
          })
          .catch(reason => {
            console.log(reason)
          })
      }, timeout)
    },
    // 计算rssi前三蓝牙设备列表
    computedStrongestSignalDeviceList() {
      const signalDeviceList = []
      const iterator = this.deviceMap.entries()
      for (let iteratorResult = iterator.next(); !iteratorResult.done; iteratorResult = iterator.next()) {
        const deviceName = iteratorResult.value[0]
        const deviceList = iteratorResult.value[1]
        // 求平均值
        let sumRssi = 0
        const averageDevice = Object.create(null)
        deviceList.forEach(device => {
          sumRssi += device.rssi
        })
        averageDevice['name'] = deviceName
        averageDevice['mac'] = deviceList[0]['mac']
        averageDevice['rssi'] = sumRssi / deviceList.length
        signalDeviceList.push(averageDevice)
      }
      signalDeviceList.sort((a, b) => {
        return a.rssi >= b.rssi
      })
      return signalDeviceList.slice(0, 2)
    },
    // 上传前三最强信号蓝牙设备
    getXY(deviceList) {
      return getPosition(deviceList)
    },
    // 清除deviceMap数据
    deleteMapValue() {
      const iterator = this.deviceMap.keys()
      for (const iteratorResult = iterator.next(); iteratorResult.done;) {
        this.deviceMap.delete(iterator)
      }
      // for (let iteratorResult = iterator.next(); iteratorResult.done;) {
      //   const deviceList = this.deviceMap.get(iteratorResult.value)
      //   deviceList.splice(0, deviceList.length)
      // }
    },
    // 判断是够满足3个蓝牙外设
    isSatisfiedThreeDevice() {
      return this.deviceMap.size >= 3
    },
    // 实现定位
    positioning(coordinate) {
      // 实现换算
    }
  },
  created() {
    this.locatedService()
    this.timedTask()
  },
  destroyed() {
    // 关闭ble扫描
    // eslint-disable-next-line
    ble.stopScan(
      () => {
        console.log('ble扫描关闭')
      },
      () => {
        console.log('ble扫描关闭异常')
      }
    )
  }
}
</script>
<style lang="less" scoped>
.roomMap {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url('../assets/images/地图1.png');
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
  .roomMap-dot-outer {
    width: 92px;
    height: 92px;
    border-radius: 92px;
    border: solid 1px #65adff;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    .roomMap-dot-inner {
      width: 32px;
      height: 32px;
      border-radius: 32px;
      border: 2px solid #ffffff;
      background-color: #366bfd;
    }
  }
}
</style>
