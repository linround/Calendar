import request from '../request'
import { CalendarEvent } from '../view/LCalendar/utils/calendar'

interface IEventListParams {
  start: number
  end: number
}
interface IData {
  list:[]
}
interface IEventResponse<T> {
  data:T
  code:number
  msg: string
}

export function getEventList(data:IEventListParams) {
  return request<any, IEventResponse<IData>>({
    url: '/event/list',
    method: 'POST',
    data,
  })
}






export function handleCreateEvent(data:CalendarEvent) {
  return request<any, IEventResponse<any>>({
    url: '/event/create',
    method: 'POST',
    data,
  })
}









