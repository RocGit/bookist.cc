import http from '../http'

export default {
  get: params => http.get('books', { params }).then(res => res.data),
  getById: id => http.get(`books/${id}`).then(res => res.data),
  getLinks: (id, key) =>
    http.get(`books/${id}/links?key=${key}`).then(res => res.data),
  checkDownloadKey: key =>
    http.put(`books/checkKey/${key}`).then(res => res.data),
}
