<template>
  <div class="meeting">
    <x-header
      :left-options="{backText: '首页', preventGoBack:true}"
      @on-click-back="handleReturn"
      title="slot:overwrite-title"
    >
      <div class="overwrite-title" slot="overwrite-title">
        <button-tab v-model="tabIndex">
          <button-tab-item>未完成</button-tab-item>
          <button-tab-item>已完成</button-tab-item>
        </button-tab>
      </div>
      <x-icon
        slot="right"
        type="ios-plus-empty"
        size="35"
        style="fill:#fff;position:relative;top:-8px;right:-3px;"
        @click.native="handleAddmeeting"
      ></x-icon>
    </x-header>
    <div class="meeting-main">
      <div v-for="(item, index) in meetingData" :key="index" class="item-block">
        <h3 class="item-block-time">{{ item.day }}</h3>
        <swipeout>
          <swipeout-item v-for="(mItem, mIndex) in item.data" :key="mIndex">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick(mItem.id)" type="warn">删除</swipeout-button>
            </div>
            <div class="meeting-blo" slot="content" @click="toMeetDetail(index, mIndex)">
              <div class="meeting-blo-left">
                <Clock :time="mItem.startTime" :size="clockSize" :state="mItem.state"></Clock>
              </div>
              <div class="meeting-blo-right">
                <h4 class="meeting-blo-title">{{mItem.subject}}</h4>
                <div class="meeting-blo-tandl">
                  <span class="meeting-blo-time">
                    <i class="icon iconfont icon-clock"></i>
                    {{mItem.startTime}}-{{mItem.endTime}}
                  </span>
                  <span class="meeting-blo-location">
                    <i class="icon iconfont icon-clock"></i>
                    {{roomMenu[mItem.room-1]}}
                  </span>
                </div>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
      </div>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  Cell,
  ButtonTab,
  ButtonTabItem,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  debounce
} from 'vux'
import { mapMutations, mapState, mapGetters } from 'vuex'
import Clock from '@/components/Clock'
import { getMeeting, deleteMeet } from '@/api/'
import { vuxInfo } from '@/utils/alert.js'

export default {
  name: 'meeting',
  components: {
    XHeader,
    Cell,
    ButtonTab,
    ButtonTabItem,
    Clock,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  data() {
    return {
      clockSize: '96px',
      roomMenu: ['会议室1', '会议室2', '会议室3'],
      tabIndex: 0,
      debounceFn: this.queryMeetingData()
    }
  },
  filters: {},
  methods: {
    ...mapMutations('meeting', ['setmeetingData', 'setshowData']),
    handleReturn() {
      this.$router.push(`/main`)
    },
    handleAddmeeting() {
      this.$router.push(`/addMeet`)
    },
    async onButtonClick(type) {
      let responseValue
      responseValue = await deleteMeet(type)
      let { status, data } = responseValue
      if (status !== 200) {
        vuxInfo(this, '服务器异常')
      } else {
        if (data === 'success') {
          this.queryMeetingData()
        }
      }
    },
    toMeetDetail(fIndex, cIndex) {
      this.$router.push({
        path: '/detailMeet',
        query: {
          tabIndex: this.tabIndex,
          fIndex,
          cIndex
        }
      })
    },
    queryMeetingData() {
      return debounce(async () => {
        let responseValue = await getMeeting(this.user.usercard)
        console.log(responseValue)
        let { status, data } = responseValue
        if (status !== 200) {
          vuxInfo(this, '请求异常')
        } else {
          this.setmeetingData(data)
        }
      }, 150)
    }
  },
  computed: {
    ...mapGetters('meeting', ['showData']),
    ...mapState('meeting', ['user']),
    meetingData() {
      return this.showData(this.tabIndex)
    }
  },
  created() {
    this.debounceFn()
  },
  activated() {
    this.debounceFn()
  }
}
</script>

<style lang="less" scoped>
.meeting {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .vux-header-title-area {
    .overwrite-title {
      width: 80%;
      margin: 5px 10%;
    }
  }
  .meeting-main {
    overflow: auto;
    height: calc(100% - 56px);
  }
  .item-block {
    .item-block-time {
      width: 720px;
      height: 80px;
      padding-left: 30px;
      line-height: 80px;
      text-align: left;
      background-color: #ffffff;
      font-family: PingFangSC-Regular;
      font-size: 30px;
      font-weight: normal;
      color: #888888;
      border-bottom: 1px solid #ccc;
    }
    .meeting-blo {
      width: 750px;
      height: 136px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ccc;
      background-color: #ffffff;
      .meeting-blo-left {
        padding: 20px 30px;
      }
      .meeting-blo-right {
        flex-grow: 1;
        .meeting-blo-title {
          text-align: left;
          height: 35px;
          line-height: 35px;
          font-family: PingFangSC-Medium;
          font-size: 36px;
          font-weight: normal;
          color: #333333;
          padding: 5px 0 25px 0;
        }
        .meeting-blo-tandl {
          text-align: left;
          .icon {
            font-size: 30px;
            color: #cecece;
          }
        }
        .meeting-blo-time {
          width: 159px;
          height: 29px;
          line-height: 29px;
          font-family: PingFangSC-Regular;
          font-size: 30px;
          font-weight: normal;
          font-weight: normal;
          color: #888888;
          text-align: left;
        }
        .meeting-blo-location {
          width: 107px;
          height: 29px;
          line-height: 29px;
          font-family: PingFangSC-Regular;
          font-size: 30px;
          font-weight: normal;
          color: #888888;
          padding-left: 60px;
        }
      }
    }
  }
}
</style>
