import axios from 'axios'
export const SUCCESS_CODE = 200
import { selectUser } from '../store/features/user/userSlice'

const baseURL = '/api'

const service = axios.create({
  baseURL,
})



service.interceptors.request.use((config) => {
  config.headers.Token = selectUser()?.token
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
