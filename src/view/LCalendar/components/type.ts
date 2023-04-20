import {
  CalendarEvent, CalendarTimestamp, VTimestampInput
} from '../utils/calendar'
import React from 'react'

export interface IWeekHeadColumn {
  day: CalendarTimestamp
  index:number
}




export function mouseEvent<T>():any {
  return (event:T) => event
}

export interface IMonthDay {
  value: VTimestampInput
  day: CalendarTimestamp
}
export type IMonthWeek  = CalendarTimestamp[]
export type IWeekEvents = CalendarEvent[]
export type IMonthEvents = IWeekEvents[]
export type IMonth = IMonthWeek[]


export interface ISlots  {
  events: CalendarEvent[]
  nativeEvent:React.MouseEvent
}

