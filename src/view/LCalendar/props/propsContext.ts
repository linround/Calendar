import { createContext } from 'react'
import {
  DEFAULT_MAX_DAYS, DEFAULT_TYPE, DEFAULT_WEEK_DAYS, DEFAULT_WEEK_SKIPS
} from '../utils/time'
import { parseDate } from '../utils/timesStamp'
import {
  IBaseContext,
  ICalendarContext,
  IEventContext,
  IIntervalsContext,
  IMouseEventContext,
  IWeeksContext
} from './type'
import { CalendarEvent } from '../utils/calendar'
import { calendarGroup } from '../SideComponent/utils'

export const DEFAULT_INTERVALS = {
  intervalHeight: 48, // 每一条刻度的高度
  intervalWidth: 60,
  firstInterval: 0, //
  intervalCount: 24, // 总共的刻度数目
  intervalMinutes: 60, // 每一个单元刻度的分钟数
}

export const DEFAULT_WEEKS = {
  minWeeks: 1, // 在月视图中显示至少一个周
  maxWeeks: 6, // 在月视图中最多显示六个周
}

export const DEFAULT_EVENT = {
  events: [],
  eventStart: 'start',
  eventEnd: 'end',
  eventTimed: 'eventTimed',
  eventOverlapMode: 'stack',
  eventOverlapThreshold: 60,
  eventHeight: 20,
  eventMarginBottom: 1,
  eventClass: 'event-item',
  eventViewContainer: 'day-view',
}


export const WeeksContext = createContext<IWeeksContext>({
  minWeeks: DEFAULT_WEEKS.minWeeks,
  maxWeeks: DEFAULT_WEEKS.maxWeeks,
})



export const EventContext = createContext<IEventContext>({
  createdEvent: null,
  parsedCreatedEvent: [],
  setCreatedEvent: () => void 0,
  parsedDraggedEvent: [],
  draggedEvent: null,
  setDraggedEvent: () => void 0,
  events: DEFAULT_EVENT.events,
  setEvents: () => undefined,
  eventStart: DEFAULT_EVENT.eventStart,
  eventEnd: DEFAULT_EVENT.eventEnd,
  eventTimed: DEFAULT_EVENT.eventTimed,
  eventOverlapMode: DEFAULT_EVENT.eventOverlapMode,
  eventOverlapThreshold: DEFAULT_EVENT.eventOverlapThreshold,
  parsedEvents: [],
  eventMarginBottom: DEFAULT_EVENT.eventMarginBottom,
  eventHeight: DEFAULT_EVENT.eventHeight,
  eventModeFunction: () => undefined,
  resetEvents: (a:CalendarEvent, b: CalendarEvent|null) => undefined,

})

export const BaseContext = createContext<IBaseContext>({
  start: parseDate(new Date()).date,
  end: parseDate(new Date()).date,
  weekDays: DEFAULT_WEEK_DAYS,
  setEnd: () => undefined,
  setStart: () => undefined,
  setWeekDays: () => undefined,
  parsedWeekdays: DEFAULT_WEEK_DAYS,
  weekdaySkips: DEFAULT_WEEK_SKIPS,
})
export const CalendarContext = createContext<ICalendarContext>({
  updateGroupList: () => void 0,
  value: Date.now(),
  setValue: () => undefined,
  type: DEFAULT_TYPE,
  setType: () => undefined,
  group: {} as calendarGroup,
  groups: [],
  setGroups: () => void 0,
  checks: [],
  setChecks: () => void 0,

  addCalendarRef: null,
  setAddCalendarRef: () => void 0,

  accountRef: null,
  setAccountRef: () => void 0,

})
export const IntervalsContext = createContext<IIntervalsContext>({
  maxDays: DEFAULT_MAX_DAYS,
  setMaxDays: () => undefined,
  intervalHeight: DEFAULT_INTERVALS.intervalHeight,
  intervalWidth: DEFAULT_INTERVALS.intervalWidth,
  firstInterval: DEFAULT_INTERVALS.firstInterval,
  intervalCount: DEFAULT_INTERVALS.intervalCount,
  intervalMinutes: DEFAULT_INTERVALS.intervalMinutes,
})

export const MouseEventContext = createContext<IMouseEventContext>({
  /**
   * todo
   * 这里和createPopover有关的变量
   * */
  setMoreDate: () => void 0,
  moreDate: null,
  setMoreEvents: () => void 0,
  moreEvents: [],
  morePopoverRef: null,
  setMorePopoverRef: () => void 0,
  createPopoverRef: null,
  setCreatePopoverRef: () => void 0,
  showCreatePopover: false,
  setShowCreatePopover: () => void 0,


  createPopoverRefV3: null,
  setCreatePopoverRefV3: () => void 0,
  showCreatePopoverV3: false,
  setShowCreatePopoverV3: () => void 0,


  /***
   * todo
   * 这里是普通的popover相关的变量
   * 这里没有去存储event
   * 因为可以使用memo来筛选出 createEvent
   */
  showNormalPopover: false,
  setShowNormalPopover: () => void 0,
  normalPopoverRef: null,
  setNormalPopoverRef: () => void 0,
  normalEvent: null,
  setNormalEvent: () => void 0,

  dayScrollRef: null,
  setDayScrollRef: () => void 0,

  clearPagePopover: () => void 0,
  updateEventList: () => void 0,
})



