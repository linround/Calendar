import request from '../request'
import { CalendarGroup } from '../view/LCalendar/utils/calendar'
import { IData, IResponse } from './common'


export function getGroupList() {
  return request<any, IResponse<IData>>({
    url: '/group/list',
    method: 'POST',
    data: {},
  })
}


export function updateGroup(data:CalendarGroup) {
  return request <any, IResponse<any>>({
    url: '/group/update',
    method: 'POST',
    data,
  })
}

export function deleteGroup(data:CalendarGroup) {
  return request <any, IResponse<any>>({
    url: '/group/delete',
    method: 'POST',
    data,
  })
}

export function handleCreateGroup(data:CalendarGroup) {
  return request<any, IResponse<any>>({
    url: '/group/create',
    method: 'POST',
    data,
  })
}









