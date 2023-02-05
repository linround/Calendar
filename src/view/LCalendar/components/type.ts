import {
  CalendarEvent, CalendarTimestamp, IMouseEvent, IMouseTime, VTimestampInput
} from '../utils/calendar'
import { ISegments } from '../utils/segments/eventSegments'

export interface IWeekHeadColumn {
  day: CalendarTimestamp
  index:number
}


export function mouseDayTime<T>():any {
  return (time:T) => time
}
export function mouseEvent<T>():any {
  return (event:T) => event
}

export interface IMonthDay {
  value: VTimestampInput
  day: CalendarTimestamp
}
export type IMonthWeek  = IMonthDay[]
export type IWeekEvents = CalendarEvent[]
export type IMonthEvents = IWeekEvents[]
export type IMonth = IMonthWeek[]

export interface IWeekSegments {
  range:IMonthDay[]
  levels:ISegments[][]
  extra:ISegments[]
  slots: number | string
}
export type IMonthSegments = IWeekSegments[]

