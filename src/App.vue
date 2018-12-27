<template>
  <div id="app">
    <keep-alive :include="keepAlive">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      keepAlive: ['meeting', 'DeskBook']
    }
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
