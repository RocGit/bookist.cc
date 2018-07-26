const names = ['_defs', 'menu', 'search', 'close', 'twitter', 'wechat', 'weibo']

let icons = {}

names.forEach(name => {
  icons[name] = require(`~/assets/icons/${name}.svg`)
})

export default icons
