import {
  CalendarEvent, CalendarEventParsed, CalendarTimestamp, IValue
} from '../utils/calendar'
import React from 'react'

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



export interface IGlobalCache{
  currentMousedownRef: null | Element
  currentMousedownEvent: CalendarEvent | null
  currentCreateEvent: CalendarEvent | null
  draggingEvent: CalendarEvent| null
  dragSource: CalendarEvent| null,
  isDragging: boolean
  isCreate: boolean
}
export interface IMouseEventContext {
  /**
   * todo
   * 这里和createPopover有关的变量
   * */
  showCreatePopover: boolean,
  setShowCreatePopover: React.Dispatch<React.SetStateAction<boolean>>,
  createPopoverRef: Element | null
  setCreatePopoverRef: React.Dispatch<React.SetStateAction<Element | null>>



  /***
   * todo
   * 这里是普通的popover相关的变量
   * 这里没有去存储event
   * 因为可以使用memo来筛选出 createEvent
   */
  showNormalPopover: boolean
  setShowNormalPopover: React.Dispatch<React.SetStateAction<boolean>>
  normalPopoverRef: Element|null
  setNormalPopoverRef: React.Dispatch<React.SetStateAction<Element | null>>
  normalEvent: CalendarEvent | null
  setNormalEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>


  /**
   * todo
   * 这里是和popover位置相关的
   */
  dayScrollRef: Element|null
  setDayScrollRef: React.Dispatch<React.SetStateAction<Element | null>>

}

