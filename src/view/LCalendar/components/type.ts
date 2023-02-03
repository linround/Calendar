import {
  CalendarEvent, CalendarTimestamp, IMouseEvent, IMouseTime, VTimestampInput
} from '../utils/calendar'
import { ISegments } from '../utils/segments/eventSegments'

export interface IWeekHeadColumn {
  day: CalendarTimestamp
  index:number
}


export const mouseDayTime = (time: IMouseTime) => undefined
export const mouseMonthTime = (time: IMouseTime) => undefined
export const mouseEvent = (event: IMouseEvent) => undefined
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

