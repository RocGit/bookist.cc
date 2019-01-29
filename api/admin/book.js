import http, { factory } from '../http'

export default {
  create: factory.createPost('books'),
  update: factory.createPut('books'),
  delete: factory.createDelete('books'),
  get: factory.createGet('books/adminGet'),
  getEdit: id => http.get(`books/${id}/edit`).then(res => res.data),

  isIsbnExist: isbn =>
    http.get(`books/existIsbn/${isbn}`).then(res => res.data),

  resolveBookList: (provider, query) =>
    http
      .get('books/ResolveList', { params: { query, provider } })
      .then(res => res.data),

  resolveBookEdit: (provider, url) =>
    http
      .get('books/ResolveEdit', { params: { url, provider } })
      .then(res => res.data)
}
