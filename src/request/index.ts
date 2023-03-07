import axios from 'axios'
export const SUCCESS_CODE = 200

const cloud = 'http://121.199.1.247:8888'
const local = 'http://127.0.0.1:8888'

const service = axios.create({
  baseURL: cloud,
})


service.interceptors.request.use((config) => config, (err) => {
  console.log('请求错误', err)
})


service.interceptors.response.use((response) => {
  if (response.status !== SUCCESS_CODE) {
    console.log('请求错误')
    return
  }
  return response.data
}, (error) => {
  console.log('响应错误', error)
})


export default service
