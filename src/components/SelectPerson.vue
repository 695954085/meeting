<template>
  <div class="select-person">
    <x-header :left-options="{backText: ''}">选择参会人员<a slot="right"
         @click="certainBookPersonList">确定({{bookPersonList.length}})</a></x-header>
    <input type="text"
           placeholder="搜索"
           class="select-person-search" />
    <div class="select-person-list">
      <div class="select-person-list-inner">
        <div class="select-persion-item"
             v-for="item in bookPersonList"
             :key="item">
          <span>{{item}}</span>
          <x-icon type="ios-close-empty"
                  size="30"
                  @click="removePerson(item)"></x-icon>
        </div>
      </div>
    </div>
    <Directory :personData="personData"></Directory>
  </div>
</template>
<script>
import Directory from '@/components/Directory'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'SelectPerson',
  components: {
    Directory
  },
  data () {
    return {
      count: 0,
      personData: ['阿本', '阿雄', '学校', '草草', '曹超', '胡小风', '方大', '校学', '玛尼', '风小', '范进']
    }
  },
  methods: {
    ...mapMutations(['setbookPersonList']),
    certainBookPersonList () {
      this.$router.push(`/addMeet`)
    },
    removePerson (value) {
      let index = this.bookPersonList.indexOf(value)
      let nList = this.bookPersonList
      nList.splice(index, 1)
      this.setbookPersonList(nList)
    }
  },
  computed: {
    ...mapState(['bookPersonList'])
  }
}
</script>
<style lang="less" scoped>
.select-person {
  width: 750px;
  height: 1344px;
  background: #f0f0f0;
  .select-person-search {
    width: 710px;
    height: 64px;
    background-color: #ffffff;
    border: none;
    border-radius: 8px;
    margin: 18px 0;
    outline: none;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 3px;
    color: #a6a6a6;
  }
  .select-person-list {
    width: 750px;
    .select-person-list-inner {
      background-color: #ffffff;
      height: 90px;
      line-height: 90px;
      white-space: nowrap;
      overflow-x: auto;
      text-align: left;
      .select-persion-item {
        display: inline-flex;
        align-items: center;
        margin: 0 10px;
        background-color: #f0f0f0;
        border-radius: 38px;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
        height: 60px;
        span {
          text-indent: 10px;
        }
      }
    }
  }
}
</style>
