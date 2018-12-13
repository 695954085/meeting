<template>
  <div class="circle-clock"
       :style="{width: vsize,height: vsize}">
    <div class="circle-clock-cont"
         :style="{background: background, transform: hourDeg}">
      <div class="hour"></div>
    </div>
    <div class="minue"
         :class="{isHalf:isHalf,isZero: !isHalf}"
         :style="{height: hvsize}"></div>
  </div>
</template>
<script>
export default {
  name: 'Clock',
  props: ['time', 'size', 'state'],
  data() {
    return {
      colorCollection: ['#FE8849', '#3384FE', '#0A4191', '#CECECE'],
      currentTIme: ''
    }
  },
  computed: {
    background: function() {
      // let start = this.time.split('-')[0]
      let start = this.time
      let time = parseInt(start.substring(0, 2))
      if (this.state === '0') {
        return this.colorCollection[3]
      }
      if (time < 12) {
        return this.colorCollection[0]
      } else if (time < 19) {
        return this.colorCollection[1]
      } else {
        return this.colorCollection[2]
      }
    },
    hourDeg: function() {
      // let start = this.time.split('-')[0]
      let start = this.time
      let time = parseInt(start.substring(0, 2))
      let value = (time % 12) * 30
      return 'rotate(' + value + 'deg)'
    },
    vsize: function() {
      return parseInt(this.size) / 7.5 + 'vw'
    },
    hvsize: function() {
      return (parseInt(this.size) - 10) / 15 + 'vw'
    },
    isHalf: function() {
      if (this.time.substring(3, 5) !== '00') {
        return true
      }
      return false
    }
  }
}
</script>
<style lang="less" scoped>
.circle-clock {
  position: relative;
  .circle-clock-cont {
    width: 100px;
    height: 100px;
    background-color: #fba;
    border-radius: 100%;
    position: relative;
    .hour {
      width: 2px;
      height: 30%;
      background-color: #f5f5f5;
      position: absolute;
      bottom: 50%;
      left: 50%;
    }
  }
  .minue {
    width: 2px;
    background-color: #e5e5e5;
    position: absolute;
    left: 50%;
  }
  .minue.isHalf {
    bottom: 6px;
  }
  .minue.isZero {
    top: 10px;
  }
}
</style>
