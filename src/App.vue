<template>
  <div id="app">
    <keep-alive :include="keepAlive">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { getPosition } from '@/api'
import { vuxInfo } from '@/utils/alert'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      keepAlive: ['meeting', 'DeskBook'],
      deviceMap: new Map()
    }
  },
  methods: {
    ...mapMutations('workarea', ['setPosition']),
    // 开启定位服务
    locatedService() {
      // eslint-disable-next-line
      ble.isEnabled(
        () => {
          // eslint-disable-next-line
          cordova.plugins.diagnostic.isLocationEnabled(
            result => {
              if (result) {
                this.startScanWithOptions()
              } else {
                vuxInfo(this, '开启定位服务', () => {
                  // eslint-disable-next-line
                  cordova.plugins.diagnostic.switchToLocationSettings()
                })
              }
            },
            error => {
              console.log(error)
              this.locatedService()
            }
          )
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
    startScanWithOptions() {
      // eslint-disable-next-line
      ble.startScanWithOptions([], { reportDuplicates: true }, device => {
        // 放进到deviceMap中
        const { name, id, rssi } = device
        // 排除非183 蓝牙外设
        if (!new RegExp(/^183\d{4}$/).test(name)) return
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
    // 开启定时服务
    timedTask(timeout = 10000) {
      // 每隔10秒钟请求一次位置
      this.sid = setTimeout(() => {
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
      // console.log(JSON.stringify(this.deviceMap))
      // 求平均值
      for (
        let iteratorResult = iterator.next();
        !iteratorResult.done;
        iteratorResult = iterator.next()
      ) {
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
        averageDevice['rssi'] = (sumRssi / deviceList.length).toFixed(6)
        signalDeviceList.push(averageDevice)
      }
      // console.log('排序前')
      // console.log(JSON.stringify(signalDeviceList))
      // 排序
      signalDeviceList.sort((a, b) => {
        return Number.parseFloat(b.rssi) - Number.parseFloat(a.rssi)
      })
      // console.log('排序后')
      // console.log(JSON.stringify(signalDeviceList))
      return JSON.stringify(signalDeviceList.slice(0, 3))
    },
    // 上传前三最强信号蓝牙设备
    getXY(deviceList) {
      return getPosition(deviceList)
    },
    // 清除deviceMap数据
    deleteMapValue() {
      const iterator = this.deviceMap.keys()
      for (
        let iteratorResult = iterator.next();
        !iteratorResult.done;
        iteratorResult = iterator.next()
      ) {
        this.deviceMap.delete(iteratorResult.value)
      }
    },
    // 判断是够满足3个蓝牙外设
    isSatisfiedThreeDevice() {
      return this.deviceMap.size >= 3
    },
    // 实现定位
    positioning(coordinate) {
      if (!coordinate) return
      // 实现换算
      const { x, y } = coordinate
      // const roomMapWidth = this.$refs['roomMapRef'].offsetWeight
      // 坐标1代表的多少vw
      const scale = 12.12
      const leftOffset = x * scale
      const topOffset = y * scale

      const left = 100 - leftOffset
      const top = 59.5 + topOffset

      this.setPosition({
        leftValue: left + 'vw',
        topValue: top + 'vw'
      })
      // this.leftValue = left + 'vw'
      // this.topValue = top + 'vw'
    }
  },
  created() {
    this.locatedService()
    this.timedTask()
    document.addEventListener('resume', this.locatedService)
  }
}
</script>
<style lang="less">
@import './assets/iconfont.css';
@import '~vux/src/styles/reset.less';
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
