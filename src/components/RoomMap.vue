<template>
  <div class="roomMap">
    <div class="roomMap-dot-outer"
         :style="{top:topValue,left:leftValue}">
      <div class="roomMap-dot-inner"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RoomMap',
  data() {
    return {
      topValue: '100px',
      leftValue: '50px'
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.roomMap {
  width: 100%;
  height: 100%;
  position: relative;
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
