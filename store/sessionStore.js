export default {
  setToken: token => sessionStorage.setItem('token', token),
  getToken: () => sessionStorage.getItem('token'),
  setUser: user => sessionStorage.setItem('user', JSON.stringify(user)),
  getUser: () => JSON.parse(sessionStorage.getItem('user')),
  clearAll: () => sessionStorage.clear()
}
