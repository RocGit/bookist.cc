import http from '../http'

export default {
  getAll: () => http.get('tags/all').then(res => res.data)
}
