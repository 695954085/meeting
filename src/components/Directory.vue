<template>
  <div class="directory">
    <group v-for="(person,index) in personData"
           :key="index">
      <checklist :title="person.letter"
                 :options="person.personMumber"
                 @on-change="change"></checklist>
    </group>
  </div>
</template>
<script>
import { Cell, Checklist } from 'vux'
export default {
  name: 'Directory',
  components: {
    Cell,
    Checklist
  },
  props: ['personData'],
  data () {
    return {
      objectList: [{ key: '1', value: '001 value' }, { key: '2', value: '002 value' }, { key: '3', value: '003 value' }]
    }
  },
  methods: {
    change (val, label) {
      alert('change')
    }
  }

}
</script>
