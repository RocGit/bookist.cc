import axios from 'axios'
import http, { factory } from '../http'

export default {
  login: factory.createPost('account/login'),

  // Qiniu
  uploadFile: async file => {
    let token = await http.get('account/qiniuToken').then(res => res.data)
    let formData = new FormData()
    formData.append('file', file)
    formData.append('token', token)
    return axios
      .post('https://upload.qiniu.com/', formData)
      .then(res => res.data)
  }

  // Aliyun
  // uploadFile: async (file) => {
  //   let ossParams = await http.get('data/OssParams').then(res => res.data)
  //   let formData = new FormData()
  //   let fileId = ossParams.newId + getFileExt(file.name)
  //   formData.append('key', fileId)
  //   formData.append('policy', ossParams.policy)
  //   formData.append('OSSAccessKeyId', ossParams.accessKeyID)
  //   formData.append('success_action_status', '200')
  //   formData.append('Signature', ossParams.signature)
  //   formData.append('file', file)
  //   let res = await http.post(ossParams.endPoint, formData)
  //   if (res.status === 200) {
  //     return { fileId }
  //   }
  //   throw new Error('上传图片失败！')
  // }
}
