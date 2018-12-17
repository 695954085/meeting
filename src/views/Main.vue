<template>
  <div class="main">
    <x-header :left-options="{showBack: false}">首页</x-header>
    <h3 class="main-kinds-title">办公类</h3>
    <grid :cols="3"
          :show-lr-borders="false">
      <grid-item v-for="(item,index) in  workData"
                 :key="index"
                 :label="item.name"
                 :link="item.link">
        <img slot="icon"
             :src="item.path">
      </grid-item>
    </grid>
    <h3 class="main-kinds-title">生活类</h3>
    <grid :cols="3"
          :show-lr-borders="false">
      <grid-item v-for="(item,index) in  lifeData"
                 :key="index"
                 :label="item.name">
        <img slot="icon"
             :src="item.path">
      </grid-item>
    </grid>
    <tabbar class="bottom-actionbar">
      <tabbar-item selected>
        <i slot="icon"
           class="icon iconfont icon-shouye"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item>
        <i slot="icon"
           class="icon iconfont icon-riqi"></i>
        <span slot="label">生活</span>
      </tabbar-item>
      <tabbar-item>
        <i slot="icon"
           class="icon iconfont icon-yinzhang"></i>
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item :link="{path: '/meeting', replace: true}">
        <i slot="icon"
           class="icon iconfont icon-man"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { XHeader, Tabbar, TabbarItem, Grid, GridItem } from 'vux'
export default {
  name: 'Main',
  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    Grid,
    GridItem
  },
  data() {
    return {
      workData: [
        {
          name: '会议管理',
          path: require('../assets/demo/icon_nav_button.png'),
          link: '/meeting'
        },
        {
          name: '办公管理',
          path: require('../assets/demo/icon_nav_button.png'),
          link: '/deskbook'
        },
        {
          name: '报销管理',
          path: require('../assets/demo/icon_nav_button.png'),
          link: '/meeting'
        }
      ],
      lifeData: [
        { name: '请假', path: require('../assets/demo/icon_nav_button.png') },
        { name: '项目', path: require('../assets/demo/icon_nav_button.png') },
        { name: '合同', path: require('../assets/demo/icon_nav_button.png') },
        { name: '出差', path: require('../assets/demo/icon_nav_button.png') },
        {
          name: '外出登记',
          path: require('../assets/demo/icon_nav_button.png')
        },
        {
          name: '宿舍入住',
          path: require('../assets/demo/icon_nav_button.png')
        }
      ]
    }
  },
  methods: {},
  filters: {}
}
</script>
<style lang="less">
.main {
  width: 100vw;
  height: 100vh;
  background-color: #e9e9e9;
  .main-kinds-title {
    text-align: left;
    padding-left: 20px;
    height: 88px;
    line-height: 88px;
    font-size: 30px;
    font-weight: normal;
    color: #888888;
  }
  .weui-grid {
    background-color: #ffffff;
  }
  .bottom-actionbar {
    position: fixed;
  }
}
</style>
