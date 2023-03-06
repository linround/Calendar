import request from '../request'
import { CalendarEvent } from '../view/LCalendar/utils/calendar'
import { IResponse, IData } from './common'

interface IEventListParams {
  start: number
  end: number
}


export function getEventList(data:IEventListParams) {
  return request<any, IResponse<IData>>({
    url: '/event/list',
    method: 'POST',
    data,
  })
}


export function updateEvent(data:CalendarEvent) {
  return request <any, IResponse<any>>({
    url: '/event/update',
    method: 'POST',
    data,
  })
}

export function deleteEvent(data:CalendarEvent) {
  return request <any, IResponse<any>>({
    url: '/event/delete',
    method: 'POST',
    data,
  })
}

export function handleCreateEvent(data:CalendarEvent) {
  return request<any, IResponse<any>>({
    url: '/event/create',
    method: 'POST',
    data,
  })
}









