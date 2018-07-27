import Vue from 'vue'

function padLeft0(num) {
  if (num < 10) {
    return '0' + num
  }
  return num
}

Vue.filter('month', val => {
  if (!val) return ''
  var date = new Date(val)
  var m = padLeft0(date.getMonth() + 1)
  // var d = padLeft0(date.getDate())
  // var h = padLeft0(date.getHours())
  // var mi = padLeft0(date.getMinutes())
  return `${date.getFullYear()}-${m}`
})

Vue.prototype.$imgUrl = (fileId, styleName) => {
  let url = `${process.env.IMAGE_URL}/${fileId}`
  if (!styleName) return url
  return `${url}-${styleName}`
}
