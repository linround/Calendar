import {
  CalendarEvent, CalendarEventParsed, CalendarTimestamp, IValue
} from '../utils/calendar'
import React from 'react'
import { calendarGroup } from '../SideComponent/utils'

export interface ITimes extends Object{
  now: CalendarTimestamp
  today: CalendarTimestamp
}

export interface IWeeksContext {
  minWeeks: number
  maxWeeks: number
}

export interface IEventContext {
  createdEvent:CalendarEvent|null
  parsedCreatedEvent:CalendarEventParsed[]
  setCreatedEvent: React.Dispatch<React.SetStateAction<CalendarEvent|null>>
  setDraggedEvent:React.Dispatch<React.SetStateAction<CalendarEvent|null>>
  draggedEvent: CalendarEvent|null
  parsedDraggedEvent:CalendarEventParsed[]
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


export interface IDataGroups {
  groups: calendarGroup[]
  setGroups:React.Dispatch<React.SetStateAction<calendarGroup[]>>

  checks: calendarGroup[]
  setChecks: React.Dispatch<React.SetStateAction<calendarGroup[]>>
}
export interface ICalendarContext extends IDataGroups{
  updateGroupList:()=>void
  group:calendarGroup
  value: IValue
  setValue: React.Dispatch<React.SetStateAction<IValue>>
  type: string,
  setType: React.Dispatch<React.SetStateAction<string>>

  addCalendarRef: Element|null // 添加日历的popover
  setAddCalendarRef: React.Dispatch<React.SetStateAction<Element | null>>

  accountRef: Element | null
  setAccountRef: React.Dispatch<React.SetStateAction<Element | null>>



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
  setMoreEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>,
  moreEvents:CalendarEvent[],
  showCreatePopoverV3: boolean,
  setShowCreatePopoverV3: React.Dispatch<React.SetStateAction<boolean>>,
  showCreatePopover: boolean,
  setShowCreatePopover: React.Dispatch<React.SetStateAction<boolean>>,
  morePopoverRef:Element|null
  setMorePopoverRef:React.Dispatch<React.SetStateAction<Element | null>>
  createPopoverRef: Element | null
  setCreatePopoverRef: React.Dispatch<React.SetStateAction<Element | null>>
  createPopoverRefV3: Element | null
  setCreatePopoverRefV3: React.Dispatch<React.SetStateAction<Element | null>>



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

  clearPagePopover:()=>void
  updateEventList:()=>void

}

