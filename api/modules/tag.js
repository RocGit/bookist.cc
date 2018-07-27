import http from '../http'

export default {
  getGroped: () => http.get('tags/groped').then(res => res.data),
}
