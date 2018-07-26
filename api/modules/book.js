import http from '../http'

export default {
  get: params => http.get('books', { params }).then(res => res.data)
}
