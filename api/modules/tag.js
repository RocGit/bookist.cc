import http from '../http'

export default {
  getGroped: () => http.get('tags/grouped').then(res => res.data),
  getTrending: () => http.$getCache('tags/trending'),
}
