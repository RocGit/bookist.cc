import http from '../http'

export default {
  getStats: () => http.$getCache('data/stats'),
}
