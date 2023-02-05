import {
  CalendarEvent, CalendarTimestamp, IMouseEvent, IMouseTime, VTimestampInput
} from '../utils/calendar'
import { ISegments } from '../utils/segments/eventSegments'
import React from 'react'

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
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function defaultShowMore(slot:number, e:React.MouseEvent) {}


export interface IMonthDay {
  value: VTimestampInput
  day: CalendarTimestamp
}
export type IMonthWeek  = IMonthDay[]
export type IWeekEvents = CalendarEvent[]
export type IMonthEvents = IWeekEvents[]
export type IMonth = IMonthWeek[]


export interface ISlots  {
  events: CalendarEvent[]
  nativeEvent:React.MouseEvent
}
export interface IWeekSegments {
  range:IMonthDay[]
  levels:ISegments[][]
  extra:ISegments[]
  slots: number | string
  getEventsForSlot: (slot:number) => CalendarEvent[]
}
export type IMonthSegments = IWeekSegments[]
