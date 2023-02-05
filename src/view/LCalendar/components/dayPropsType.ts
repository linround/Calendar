import {
  CalendarEvent, CalendarTimestamp, IMonthMouseTime, IMouseEvent, IMouseTime, IValue, VTimestampInput
} from '../utils/calendar'
import React from 'react'

export interface ICalendar {
  type: string
  value: IValue
}
export interface ITimes {
  now:CalendarTimestamp | null
  today: CalendarTimestamp | null
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


interface IHandleEvent<E, T> {
  onTimeHeaderClick: (e:React.MouseEvent, event:CalendarTimestamp) => any
  onMousedownEvent:(event: E) => void
  onContextMenuEvent: (event: E) => void
  onTimeContainerMouseup: (time:T) => void
  onTimeContainerMousemove: (time:T) => void
  onTimeContainerMousedown: (time:T) => void
}

export type IMonthProps  = IHandleEvent<IMouseEvent, IMonthMouseTime>
export interface IDayProps extends IHandleEvent<IMouseEvent, IMouseTime>{
  firstTime?: number|string|object
}

