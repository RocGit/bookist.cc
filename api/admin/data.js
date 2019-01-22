import axios from 'axios'
import http, { factory } from '../http'

export default {
  getEnums: factory.createGet('data/enums'),
  getConfigs: factory.createGet('data/configs'),
  getTags: factory.createGet('tags')
}
