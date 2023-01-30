import { createContext } from 'react'
import {
  DEFAULT_MAX_DAYS, DEFAULT_WEEK_DAYS, DEFAULT_WEEK_SKIPS
} from '../utils/time'
import { parseDate } from '../utils/timesStamp'
import {
  IBaseContext, ICalendarContext, IEventContext, IIntervalsContext, IWeeksContext
} from './type'
import { CalendarEvent } from '../utils/calendar'

export const DEFAULT_INTERVALS = {
  intervalHeight: 48,
  intervalWidth: 60,
  firstInterval: 0,
  intervalCount: 24,
  intervalMinutes: 60,
}

export const DEFAULT_WEEKS = {
  minWeeks: 1,
}

export const DEFAULT_EVENT = {
  events: [],
  eventStart: 'start',
  eventEnd: 'end',
  eventTimed: 'timed',
  eventOverlapMode: 'stack',
  eventOverlapThreshold: 60,
}


export const WeeksContext = createContext<IWeeksContext>({
  minWeeks: DEFAULT_WEEKS.minWeeks,
})



export const EventContext = createContext<IEventContext>({
  events: DEFAULT_EVENT.events,
  setEvents: () => undefined,
  eventStart: DEFAULT_EVENT.eventStart,
  eventEnd: DEFAULT_EVENT.eventEnd,
  eventTimed: DEFAULT_EVENT.eventTimed,
  eventOverlapMode: DEFAULT_EVENT.eventOverlapMode,
  eventOverlapThreshold: DEFAULT_EVENT.eventOverlapThreshold,
  parsedEvents: [],
  eventModeFunction: () => undefined,
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
  value: '',
  setValue: () => undefined,
  type: 'week',
  setType: () => undefined,
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

