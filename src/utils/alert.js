export const vuxInfo = (vueCompoment, msg, fn) => {
  if (typeof msg === 'object') {
    msg = JSON.stringify(msg)
  }
  if (!fn) {
    vueCompoment.$vux.alert.show({
      title: '提示',
      content: msg
    })
  } else {
    vueCompoment.$vux.alert.show({
      title: '提示',
      content: msg,
      onHide: fn
    })
  }
}
