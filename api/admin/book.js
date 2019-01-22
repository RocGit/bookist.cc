import http, { factory } from '../http'

export default {
  create: factory.createPost('books'),
  update: factory.createPut('books'),
  delete: factory.createDelete('books'),
  get: factory.createGet('books/adminGet'),
  getEdit: id => http.get(`books/${id}/edit`).then(res => res.data),
  isExist: isbn => http.get(`books/${isbn}/exist`).then(res => res.data)
}
