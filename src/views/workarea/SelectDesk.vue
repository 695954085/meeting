<template>
  <div class="selectDesk">
    <x-header :left-options="{backText: ''}"
              @on-click-back="handlexx">工位选择
      <a slot="right"
         @click="handleComplate">确定</a>
    </x-header>
    <div class="selectDesk-main">
      <div class="selectDesk-seat-main">
        <div class="selectDesk-seat-item"
             v-for="(item,index) in deskBookSeatData"
             :key="index"
             @click="handleSelect(index)"
             :class="{isActive: item.isActive,
             isAble: !item.isAble}">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'SelectDesk',
  data() {
    return {}
  },
  computed: {
    ...mapState('workarea', ['deskBookSeatData'])
  },
  methods: {
    ...mapMutations('workarea', ['setdeskBookSeatData']),
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
    .selectDesk-seat-main {
      width: 100%;
      display: flex;
      .selectDesk-seat-item {
        height: 40px;
        line-height: 40px;
        width: 20%;
        &.isActive {
          background-color: #ffaabb;
        }
        &.isAble {
          background-color: #cccccc;
        }
      }
    }
  }
}
</style>
