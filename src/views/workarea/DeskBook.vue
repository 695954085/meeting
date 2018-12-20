<template>
  <!-- <todo-list>
    <template slot-scope="slotProps">
      <span v-if="slotProps.todo.isComplete">✓</span>
      {{ slotProps.todo.text }}
    </template>
  </todo-list> -->
  <group>
    <datetime title='使用日期'></datetime>
    <datetime1 title='使用日期'></datetime1>
  </group>
  <!-- <group>
    <picker :data='years'
            v-model='year1'></picker>
  </group> -->
</template>

<script>
// import todoList from './todolist'
import { Datetime } from 'vux'
import Datetime1 from '@/components/datetime/Datetime'
import DatePicker from '@/components/datetime/DatePicker'
// import { Picker } from 'vux'

export default {
  name: 'DeskBook',
  components: {
    // todoList,
    Datetime,
    Datetime1,
    DatePicker
  },
  computed: {
    years() {
      let years = []
      for (var i = 2000; i <= 2030; i++) {
        years.push({
          name: i + '年',
          value: i + ''
        })
      }
      return [years]
    }
  },
  data() {
    return {
      year1: ['']
    }
  }
}
</script>
