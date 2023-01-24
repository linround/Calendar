import {
  CalendarEvent, CalendarTimestamp, IMouseEvent, IMouseTime
} from '../utils/calendar'
import React from 'react'

export interface ICalendar {
  type: string
  value: string | number | Date
}
export interface  IBase{
  start: string
  end: string
  weekdays: number[] | string
}

export type IEvents = CalendarEvent[]

export interface IIntervals {
  maxDays: number
  intervalWidth: number | string
  firstTime?: number|string|object
  firstInterval: number|string
  intervalMinutes: string |number
  intervalCount: number
  intervalHeight: number
}

export interface IEvent {
  eventStart : string,
  eventEnd : string,
  eventTimed : string,
  eventOverlapMode: string
  eventOverlapThreshold: number|string
}



export interface IHandleEvent {
  onClickHeaderTime: (e:React.MouseEvent, event:CalendarTimestamp) => any
  onMousedownEvent:(event: IMouseEvent) => void
  onTimeContainerMouseup: (time:IMouseTime) => void
  onTimeContainerMousemove: (time:IMouseTime) => void
  onTimeContainerMousedown: (time:IMouseTime) => void
}

export interface IDayProps extends ICalendar, IBase, IIntervals, IEvent, IHandleEvent{
  events: IEvents
}

