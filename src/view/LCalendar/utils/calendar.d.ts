import React from 'react'


export type IValue = string|number|Date

export interface IHeaderEvent {
  prev: (amount: number) => any
  next: (amount: number) => any
  type: string
  value: IValue
  setType:(type: string) => any
  setToday:(type: IValue) => any
}
export interface ICalendarHeader extends IHeaderEvent{
  [prop:string]:any
}


export interface CalendarTimestamp {
  date: string
  time: string
  year: number
  month: number
  day: number
  weekday: number
  hour: number
  minute: number
  hasDay: boolean
  hasTime: boolean
  past: boolean
  present: boolean
  future: boolean
}


export type VTimestampInput = number | string | Date

export type CalendarCategory =
  | string
  | {
  name?: string
  categoryName?: string
  [key: string]: any
}
export interface CalendarDaySlotScope extends CalendarTimestamp {
  outside:boolean
  index:number
  week: CalendarTimestamp[]
  category?: CalendarCategory
}



export type CalendarTimeToY = (time:CalendarTimestamp | number | string, clamp?:boolean) => number
export type CalendarTimeDelta = (time: CalendarTimestamp | number | string) => number| false
export interface CalendarDayBodySlotScope extends CalendarDaySlotScope {
  timeToY: CalendarTimeToY
  timeDelta: CalendarTimeDelta
}


export interface CalendarEvent {
  [prop:string]: any
}
export interface CalendarEventParsed {
  input: CalendarEvent
  start: CalendarTimestamp
  startIdentifier: number
  startTimestampIdentifier: number
  end: CalendarTimestamp
  endIdentifier: number
  endTimestampIdentifier: number
  allDay: boolean
  index: number
  category: string | false
}




export type CalendarEventOverlapMode = (
  events: CalendarEventParsed[],
  firstWeekday: number,
  overlapThreshold: number) => (
    day: CalendarDaySlotScope,
    dayEvents: CalendarEventParsed[],
    eventTimed: boolean,
    reset: boolean) => CalendarEventVisual[]


export interface IMouseEvent {
  nativeEvent: React.MouseEvent
  event: CalendarEvent
}

export interface IMouseTime extends CalendarTimestamp {
  nativeEvent: React.MouseEvent

}
export interface IMonthMouseTime {
  day: CalendarTimestamp
  value: VTimestampInput
  type: string
  nativeEvent: React.MouseEvent
}
