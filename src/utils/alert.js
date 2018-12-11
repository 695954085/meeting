export const vuxInfo = (vueCompoment, msg) => {
  if (typeof msg === 'object') {
    msg = JSON.stringify(msg)
  }
  vueCompoment.$vux.alert.show({
    title: '提示',
    content: msg
  })
}
