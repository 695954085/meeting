<template>
  <div class="superMain">
    <x-header :left-options="{backText: ''}">超级开门码</x-header>
    <div class="superMain-cont">
      <qrcode :value="this.token"
              type="img"
              size="260"></qrcode>
    </div>
  </div>
</template>
<script>
import { Qrcode } from 'vux'
import { vuxInfo } from '@/utils/alert.js'
import { getAdminCode } from '@/api/'
export default {
  name: 'SuperMain',
  components: {
    Qrcode
  },
  data() {
    return {
      token: ''
    }
  },
  async mounted() {
    let responseValue = await getAdminCode()
    console.log(responseValue)
    let { status, data } = responseValue
    if (status !== 200) {
      vuxInfo(this, '服务器异常')
    } else {
      this.token = data
    }
  }
}
</script>
<style lang="less" scoped>
.superMain {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(-10deg, #05327b 0%, #105ab6 100%),
    linear-gradient(#e9e9e9, #e9e9e9);
  .superMain-cont {
    width: 100%;
    height: calc(100% - 46px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
