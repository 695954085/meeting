<template>
  <div class="directory">
    <group v-for="(person,index) in dealData"
           :key="index"
           :title="person.letter|toUpperCase">
      <checklist :check-disabled="false"
                 :options="person.data"
                 v-model="personList"></checklist>
    </group>
  </div>
</template>
<script>
import { Cell, Checklist } from 'vux'
import { mapState, mapMutations } from 'vuex'
import Pingyin from '../utils/pingyin.js'
export default {
  name: 'Directory',
  components: {
    Cell,
    Checklist
  },
  props: ['personData'],
  data() {
    return {}
  },
  filters: {
    toUpperCase: function(value) {
      return value.toUpperCase()
    }
  },
  methods: {
    ...mapMutations('metting', ['setbookPersonList']),
    change(val, label) {
      // if (val.length !== 0) {
      //   console.log(this.personList)
      //   this.setbookPersonList(this.personList)
      // }
    }
  },
  computed: {
    ...mapState('metting', ['bookPersonList']),
    dealData: function() {
      let data = Pingyin.pySegSort(this.personData)
      return data
    },
    personList: {
      get() {
        return this.bookPersonList
      },
      set(val) {
        this.setbookPersonList(val)
      }
    }
  }
}
</script>
<style lang="less">
.directory {
  .weui-cells__title {
    text-align: left;
    text-indent: 10px;
    background-color: #f0f0f0;
  }
  .weui-cell__bd p {
    text-align: left;
    text-indent: 10px;
  }
}
</style>
