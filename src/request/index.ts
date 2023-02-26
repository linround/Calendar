import axios from 'axios'
export const SUCCESS_CODE = 200


const service = axios.create({
  baseURL: 'http://121.199.1.247:8888',
})


service.interceptors.request.use((config) => {
  console.log('请求拦截')
  return config
}, (err) => {
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
