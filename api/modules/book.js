import http from '../http'

export default {
  get: params => http.get('books', { params }).then(res => res.data),
  getById: id => http.get(`books/${id}`).then(res => res.data),
}
