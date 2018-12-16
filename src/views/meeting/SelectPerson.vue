<template>
  <div class="select-person">
    <div class="select-person-main">
      <x-header :left-options="{backText: ''}">选择参会人员<a slot="right"
           @click="certainBookPersonList">确定({{bookPersonList.length}})</a></x-header>
      <div class="select-person-fixpart">
        <div class="select-person-search">
          <x-icon type="ios-search"
                  class="icon-search"></x-icon>
          <input type="text"
                 placeholder="搜索"
                 v-model="searchText"
                 @change="handleSearch" />
        </div>
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
      </div>
      <div v-show="!showSearch"
           class="select-person-directory">
        <Directory :personData="personData"></Directory>
      </div>
      <div v-show="showSearch"
           class="search-person-directory">
        <SearchDict :personData="searchData"></SearchDict>
      </div>
    </div>
  </div>
</template>
<script>
import Directory from '@/components/Directory'
import SearchDict from '@/components/SearchDict'
import { mapMutations, mapState } from 'vuex'
import { getLinkMan } from '@/api'
import { vuxInfo } from '@/utils/alert.js'
export default {
  name: 'SelectPerson',
  components: {
    Directory,
    SearchDict
  },
  data() {
    return {
      count: 0,
      searchText: '',
      personData: [],
      showSearch: false,
      searchData: []
      // personData: ['阿本', '阿雄', '学校', '草草', '曹超', '胡小风', '方大', '校学', '玛尼', '风小', '范进']
    }
  },
  async mounted() {
    let responseValue = await getLinkMan('all')
    let { status, data } = responseValue
    console.log(responseValue)
    if (status !== 200) {
      vuxInfo(this, '服务器异常')
    } else {
      if (data.length > 0) {
        // 设置联系人
        this.personData = data
        // 设置一下登录人勾选
        let bookData = []
        bookData.push(this.user.username)
        this.setbookPersonList(bookData)
      } else {
        vuxInfo(this, '联系人列表查询为空')
      }
    }
  },
  methods: {
    ...mapMutations('metting', ['setbookPersonList']),
    certainBookPersonList() {
      this.$router.push(`/addMeet`)
    },
    removePerson(value) {
      let index = this.bookPersonList.indexOf(value)
      let nList = this.bookPersonList
      nList.splice(index, 1)
      this.setbookPersonList(nList)
    },
    handleSearch() {
      console.log(this.searchText)
      // filter data
      // this.personData.forEach(element => {
      //   if (element.indexOf(this.searchText) !== -1) {
      //     this.searchData.push(element)
      //   }
      // })
    }
  },
  computed: {
    ...mapState('metting', ['bookPersonList', 'user'])
  }
}
</script>
<style lang="less" scoped>
.select-person {
  width: 100vw;
  height: 100vh;
  background: #f0f0f0;
  overflow: hidden;
  .select-person-main {
    height: calc(100% - 46px);
  }
  .select-person-fixpart {
    height: 194px;
    .select-person-search {
      width: 710px;
      height: 64px;
      margin: 18px 20px;
      position: relative;
      .icon-search {
        background: #fff;
        position: absolute;
        top: 8px;
        width: 30px;
        height: 30px;
        fill: #a6a6a6;
        padding: 10px;
      }
      input {
        width: 100%;
        height: 100%;
        text-indent: 60px;
        background-color: #ffffff;
        border: none;
        border-radius: 8px;
        outline: none;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 3px;
        color: #a6a6a6;
      }
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
          margin: 15px 10px 0 10px;
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
  .select-person-directory {
    overflow: auto;
    height: calc(100% - 214px);
  }
}
</style>
