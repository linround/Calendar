import request from '../request'
import {  CalendarUser } from '../view/LCalendar/utils/calendar'
import { IResponse } from './common'



export function handleLogin(data:CalendarUser) {
  return request <any, IResponse<any>>({
    url: '/base/login',
    method: 'POST',
    data,
  })
}


export function updateUser(data:CalendarUser) {
  return request <any, IResponse<any>>({
    url: '/user/update',
    method: 'POST',
    data,
  })
}

export function deleteUser(data:CalendarUser) {
  return request <any, IResponse<any>>({
    url: '/user/delete',
    method: 'POST',
    data,
  })
}

export function handleRegisterUser(data:CalendarUser) {
  return request<any, IResponse<any>>({
    url: '/base/register',
    method: 'POST',
    data,
  })
}









