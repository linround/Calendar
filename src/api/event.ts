import request from '../request'

interface IEventListParams {
  start: number
  end: number
}
interface IData {
  list:[]
}
interface IEventListResponse {
  data:IData
  code:number
  msg: string
}

export function getEventList(data:IEventListParams) {
  return request<any, IEventListResponse>({
    url: '/event/list',
    method: 'POST',
    data,
  })
}
