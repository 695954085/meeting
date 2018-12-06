<template>
  <div class="select-person">
    <x-header :left-options="{backText: ''}">选择参会人员<a slot="right">确定({{count}})</a></x-header>
    <input type="text"
           placeholder="搜索框"
           class="select-person-search" />
    <div class="select-person-list">
      <div class="select-persion-item"><span>阿东</span>
        <x-icon type="ios-close-empty"
                size="30"></x-icon>
      </div>
    </div>
    <Directory :personData="personData"></Directory>
  </div>
</template>
<script>
import Directory from '@/components/Directory'
export default {
  name: 'SelectPerson',
  components: {
    Directory
  },
  data () {
    return {
      count: 0,
      personData: [{
        id: '1',
        name: '阿东'
      }, {
        id: '2',
        name: '包韩'
      }, {id: '3',
        name: '曹峰' }]
    }
  }
}
</script>
<style lang="less" scoped>
.select-person {
  .select-person-search {
    width: 90%;
    font-size: 18px;
    margin: 18px 0;
    outline: none;
  }
  .select-person-list {
    display: flex;
    flex-wrap: no-wrap;
    .select-persion-item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 30px;
      background: #cecece;
      border-radius: 30px;
    }
  }
}
</style>
