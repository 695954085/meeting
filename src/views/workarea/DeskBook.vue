<template>
  <div class="deskBook">
    <x-header :left-options="{backText: '',preventGoBack:true}"
              @on-click-back="handleReturn"
              title="slot:overwrite-title">
      <div class="overwrite-title"
           slot="overwrite-title">
        <button-tab v-model="tabIndex1">
          <button-tab-item @on-item-click="handleTab()">室内地图</button-tab-item>
          <button-tab-item @on-item-click="handleTab()">工位预约</button-tab-item>
        </button-tab>
      </div>
    </x-header>
    <div class="deskBook-main">
      <RoomMap v-show="tabIndex1=== 0" :locationValue="locationValue"></RoomMap>
      <DeskList v-show="tabIndex1 === 1" v-on:ee="changeLocation"></DeskList>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
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
  computed: {
    ...mapState('workarea', ['tabIndex', 'currentPosition']),
    tabIndex1: {
      get() {
        return this.tabIndex
      },
      set(val) {
        this.settabIndex(val)
      }
    },
    locationValue: function() {
      return this.currentPosition
    }
  },
  methods: {
    ...mapMutations('workarea', ['settabIndex', 'setcurrentPosition']),
    changeLocation(value) {
      this.settabIndex(0)
      this.setcurrentPosition(parseInt(value))
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
