import {
  CalendarEvent, CalendarTimestamp, VTimestampInput
} from '../utils/calendar'
import { ISegments } from '../utils/segments/eventSegments'

export interface IWeekHeadColumn {
  day: CalendarTimestamp
  index:number
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
}
export type IMonthSegments = IWeekSegments[]

