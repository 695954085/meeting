<template>
  <div class="circle-clock">
    <div class="circle-clock-cont"
         :style="{width: vsize,height: vsize, background: background, transform: hourDeg}">
      <div class="hour"></div>
    </div>
    <div class="minue"
         :style="{left: hvsize,height: hvsize}"></div>
  </div>
</template>
<script>
export default {
  name: 'Clock',
  props: ['time', 'size', 'state'],
  data () {
    return {
      colorCollection: ['#FE8849', '#3384FE', '#0A4191', '#CECECE'],
      currentTIme: ''
    }
  },
  computed: {
    background: function () {
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
    hourDeg: function () {
      // let start = this.time.split('-')[0]
      let start = this.time
      let time = parseInt(start.substring(0, 2))
      let value = time % 12 * 30
      return 'rotate(' + value + 'deg)'
    },
    vsize: function () {
      return parseInt(this.size) / 7.5 + 'vw'
    },
    hvsize: function () {
      return parseInt(this.size) / 15 + 'vw'
    }
  }
}
</script>
<style lang="less" scoped>
.circle-clock {
  position: relative;
  .circle-clock-cont {
    // width: 80px;
    // height: 80px;
    background-color: #fba;
    border-radius: 100%;
    position: relative;
    .hour {
      width: 2px;
      height: 30%;
      background-color: white;
      position: absolute;
      bottom: 50%;
      left: 50%;
    }
  }
  .minue {
    width: 3px;
    background-color: white;
    position: absolute;
    top: 0;
    //left: 40px;
  }
}
</style>
