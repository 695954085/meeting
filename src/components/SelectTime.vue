<template>
  <div class="select-time">
    <x-header title="slot:overwrite-title">
      <div class="overwrite-title-demo"
           slot="overwrite-title">
        <select name=""
                id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <a slot="right">确定</a>
    </x-header>
  </div>
</template>
<script>
export default {
  name: 'SelectTime',
  data () {
    return {
      msg: 'jadfajfpf'
    }
  }
}
</script>
