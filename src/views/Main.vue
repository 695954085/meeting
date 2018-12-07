<template>
  <div class="main">
    <x-header :left-options="{showBack: false}">首页</x-header>
    <h3>办公类</h3>
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
    <h3>生活类</h3>
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
      <tabbar-item show-dot
                   selected>
        <img slot="icon"
             src="../assets/demo/icon_nav_button.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon"
             src="../assets/demo/icon_nav_msg.png">
        <span slot="label">生活</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon"
             src="../assets/demo/icon_nav_article.png">
        <span slot="label">社区</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon"
             src="../assets/demo/icon_nav_cell.png">
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
  data () {
    return {
      workData: [
        { name: '会议管理',
          path: require('../assets/demo/icon_nav_button.png'),
          link: '/meetting' },
        { name: '办公管理',
          path: require('../assets/demo/icon_nav_button.png'),
          link: '/meetting' },
        { name: '报销管理',
          path: require('../assets/demo/icon_nav_button.png'),
          link: '/meetting' }
      ],
      lifeData: [
        { name: '请假', path: require('../assets/demo/icon_nav_button.png') },
        { name: '项目', path: require('../assets/demo/icon_nav_button.png') },
        { name: '合同', path: require('../assets/demo/icon_nav_button.png') },
        { name: '出差', path: require('../assets/demo/icon_nav_button.png') },
        { name: '外出登记', path: require('../assets/demo/icon_nav_button.png') },
        { name: '宿舍入住', path: require('../assets/demo/icon_nav_button.png') }
      ]
    }
  },
  methods: {
  },
  filters: {
  }

}
</script>
<style lang="less" scoped>
.bottom-actionbar {
  position: fixed;
}
</style>
