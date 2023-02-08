import {
  CalendarEvent, CalendarEventParsed, CalendarTimestamp, IValue
} from '../utils/calendar'
import React from 'react'
import { MouseEventContext } from './propsContext'

export interface ITimes extends Object{
  now: CalendarTimestamp
  today: CalendarTimestamp
}

export interface IWeeksContext {
  minWeeks: number
}

export interface IEventContext {
  events: CalendarEvent[]
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
  eventStart: string
  eventEnd: string
  eventTimed: string
  eventOverlapMode: string
  eventOverlapThreshold: number
  eventHeight: number
  eventMarginBottom: number
  parsedEvents: CalendarEventParsed[]
  eventModeFunction: (parsedEvents: CalendarEventParsed[], parsedWeekdays:number, threshold: number)=> any
  resetEvents: (o:CalendarEvent, n:CalendarEvent | null) => void
}

export interface IBaseContext {
  start: string
  setStart: React.Dispatch<React.SetStateAction<string>>
  end:string
  setEnd: React.Dispatch<React.SetStateAction<string>>
  weekDays: number[]
  setWeekDays: React.Dispatch<React.SetStateAction<number[]>>
  parsedWeekdays: number[]
  weekdaySkips:number[]
  times?: ITimes
  parsedEnd?: CalendarTimestamp
  parsedStart?:CalendarTimestamp
  parsedValue?:CalendarTimestamp
  days?:CalendarTimestamp[]
}
export interface ICalendarContext {
  value: IValue,
  setValue: React.Dispatch<React.SetStateAction<IValue>>
  type: string,
  setType: React.Dispatch<React.SetStateAction<string>>
}
export interface IIntervalsContext {
  maxDays: number
  setMaxDays: React.Dispatch<React.SetStateAction<number>>
  intervalHeight: number
  intervalWidth: number
  firstInterval: number
  intervalCount: number
  intervalMinutes: number
}

export interface IMouseEventContext {
  clickEvent: CalendarEvent | null
  setClickEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>

  mousedownEvent: CalendarEvent | null
  setMousedownEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>

  mouseupEvent: CalendarEvent | null
  setMouseupEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>

  timeContainerClick: boolean
  setTimeContainerClick: React.Dispatch<React.SetStateAction<boolean>>

  timeContainerMouseDown: boolean
  setTimeContainerMouseDown: React.Dispatch<React.SetStateAction<boolean>>

  timeContainerMousemove: boolean
  setTimeContainerMousemove: React.Dispatch<React.SetStateAction<boolean>>

  timeContainerMouseUp: boolean
  setTimeContainerMouseUp: React.Dispatch<React.SetStateAction<boolean>>


  selectedRef: Element | null
  setRef: React.Dispatch<React.SetStateAction<Element | null>>

  createEvent: CalendarEvent | null
  setCreateEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>

  popover: boolean
  setPopover: React.Dispatch<React.SetStateAction<boolean>>
}

