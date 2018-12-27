<template>
  <div class="deskBook">
    <x-header :left-options="{backText: '' }"
              title="slot:overwrite-title">
      <div class="overwrite-title"
           slot="overwrite-title">
        <button-tab v-model="tabIndex">
          <button-tab-item>室内地图</button-tab-item>
          <button-tab-item>工位预约</button-tab-item>
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
      tabIndex: 0,
      currentPosition: 0
    }
  },
  watch: {
    tabIndex(nV, oV) {
      // 当tabIndex从0变为1的时候，清除掉旧的红标位置
      this.currentPosition = nV === 1 ? 0 : this.currentPosition
    }
  },
  methods: {
    changeLocation(position) {
      this.tabIndex = 0
      this.currentPosition = parseInt(position)
    }
  },
  activated() {
    this.currentPosition = this.$route.query.currentPosition || this.currentPosition
  },
  deactivated() {
    // 失活的时候清除红标位置
    this.currentPosition = 0
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
