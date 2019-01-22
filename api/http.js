import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'buefy/dist/components/toast'
import sessionStore from '@/store/sessionStore'

const isClient = !!process.client

const alert = msg => {
  if (isClient) {
    Toast.open({ duration: 5000, message: msg, type: 'is-danger' })
  } else {
    throw new Error(msg)
  }
}

function handleResponseError({ status, data }) {
  switch (status) {
    case 401:
    case 403:
      Vue.router.replace('/login')
      break
    case 404:
      alert('对不起，资源不存在或已被删除！')
      break
    case 400:
      if (typeof data === 'string') {
        alert(data)
      } else if (typeof data === 'object') {
        for (let name in data) {
          var itemErrors = data[name]
          if (itemErrors.length > 0) {
            alert(itemErrors[0])
            break
          }
        }
      }
      break
    default:
      alert('对不起，服务器出现了故障！')
  }
}

const http = axios.create({
  baseURL: isClient ? process.env.API_URL : process.env.API_URL_SSR,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(
  config => {
    if (isClient) {
      const token = sessionStore.getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      handleResponseError(error.response)
      return new Promise(() => {})
    }
    return Promise.reject(error)
  }
)

// Client-side only
http.$getCache = function(apiPath, params) {
  let key = apiPath + (params ? JSON.stringify(params) : '')
  let cached = sessionStorage.getItem(key)
  if (cached) return Promise.resolve(JSON.parse(cached))

  return http.get(apiPath, params).then(res => {
    sessionStorage.setItem(key, JSON.stringify(res.data))
    return res.data
  })
}

export const factory = {
  createGet: path => params => http.get(path, { params }).then(res => res.data),

  createPost: path => data => http.post(path, data).then(res => res.data),

  createPut: pathWithoutId => (id, data) =>
    http.put(`${pathWithoutId}/${id}`, data).then(res => res.data),

  createDelete: pathWithoutId => (id, data) =>
    http.delete(`${pathWithoutId}/${id}`).then(res => res.data)
}

export default http
