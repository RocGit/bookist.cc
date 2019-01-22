import http from '../http'

export default {
  get: params => http.get('books', { params }).then(res => res.data),
  getById: id => http.get(`books/${id}`).then(res => res.data),
  getLinks: (id, code) =>
    http.get(`books/${id}/links?code=${code}`).then(res => res.data),
  checkDownloadCode: code =>
    http.put(`books/checkCode/${code}`).then(res => res.data),
  getStats: () => http.get('books/stats').then(res => res.data)
}
