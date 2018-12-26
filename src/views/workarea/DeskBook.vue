<template>
  <div class="deskBook">
    <x-header :left-options="{backText: '', preventGoBack: true}"
              @on-click-back="handleReturn"
              title="slot:overwrite-title">
      <div class="overwrite-title"
           slot="overwrite-title">
        <button-tab v-model="tabIndex">
          <button-tab-item @on-item-click="handleTab()">室内地图</button-tab-item>
          <button-tab-item @on-item-click="handleTab()">工位预约</button-tab-item>
        </button-tab>
      </div>
    </x-header>
    <div class="deskBook-main">
      <RoomMap v-show="tabIndex === 0" :locationValue="currentPosition"></RoomMap>
      <DeskList v-show="tabIndex === 1" v-on:ee="changeLocation"></DeskList>
    </div>
  </div>
</template>

<script>
import { XHeader, ButtonTab, ButtonTabItem } from 'vux'
import DeskList from '@/components/DeskList'
import RoomMap from '@/components/RoomMap'
export default {
  name: 'DeskBook',
  components: {
    XHeader,
    ButtonTab,
    ButtonTabItem,
    RoomMap,
    DeskList
  },
  data() {
    return {
    }
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0
    },
    currentPosition: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changeLocation(position) {
      this.tabIndex = 0
      this.currentPosition = parseInt(position)
    },
    handleReturn() {
      this.$router.push(`/main`)
    },
    handleTab() {}
  }
}
</script>
<style lang="less" scoped>
.deskBook {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .vux-header-title-area {
    .overwrite-title {
      width: 80%;
      margin: 5px 10%;
    }
  }
  .deskBook-main {
    background-color: #e9e9e9;
    height: calc(100% - 46px);
  }
}
</style>
