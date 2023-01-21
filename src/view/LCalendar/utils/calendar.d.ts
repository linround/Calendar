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

export interface CalendarDaySlotScope extends CalendarTimestamp {
  outside:boolean
  index:number
  week: CalendarTimestamp[]
}

export interface CalendarDayBodySlotScope extends CalendarDaySlotScope {
  timeToY: CalendarTimestamp
  timeDelta: CalendarTimestamp
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
