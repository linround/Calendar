import { CalendarEvent } from '../utils/calendar'

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
  intervalCount: number | string
  intervalHeight: number |string
}

export interface IEvent {
  eventStart : string,
  eventEnd : string,
  eventTimed : string,
  eventOverlapMode: string
  eventOverlapThreshold: number|string
}

export interface IDayProps extends ICalendar, IBase, IIntervals, IEvent{
  events: IEvents
}

