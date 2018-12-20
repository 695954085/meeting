<template>
  <a class="vux-datetime weui-cell weui-cell_access"
     href="javascript:"
     @click="show">
    <slot>
      <div>
        <slot name="title">
          <p :style="styles"
             :class="labelClass"
             v-html="title"></p>
        </slot>
      </div>
      <div class="weui-cell__ft vux-cell-primary vux-datetime-value">
      </div>
    </slot>
  </a>
</template>
<script>
import DatePickerComponent from './DatePicker'
import Vue from 'vue'

export default {
  name: 'datetime',
  data() {
    return {
      datePicker: ''
    }
  },
  props: {
    title: String
  },
  computed: {
    styles() {
      if (!this.$parent) {
        return {}
      }
      return {
        width: this.$parent.labelWidth,
        textAlign: this.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight
      }
    },
    labelClass() {
      if (!this.$parent) {
        return {}
      }
      return {
        'vux-cell-justify':
          this.$parent.labelAlign === 'justify' ||
          this.$parent.$parent.labelAlign === 'justify'
      }
    }
  },
  methods: {
    show() {
      if (!this.datePicker) {
        const DatePicker = Vue.extend(DatePickerComponent)
        this.datePicker = new DatePicker()
        this.datePicker.$mount()
        document.body.appendChild(this.datePicker.$el)
      }
      this.datePicker.isShow = true
    }
  }
}
</script>
