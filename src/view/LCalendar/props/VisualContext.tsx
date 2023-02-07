import {
  BaseContext,
  CalendarContext,
  EventContext,
  DEFAULT_INTERVALS, DEFAULT_WEEKS,
  IntervalsContext,
  WeeksContext, DEFAULT_EVENT
} from './propsContext'
import React, { useMemo, useState } from 'react'
import {
  DEFAULT_MAX_DAYS, DEFAULT_TYPE, DEFAULT_VALUE, DEFAULT_WEEK_DAYS
} from '../utils/time'
import {
  createDayList,
  getTimestampIdentifier, getWeekdaySkips, parseTimeStamp, validateTimestamp
} from '../utils/timesStamp'
import {
  CalendarEvent, CalendarEventOverlapMode, CalendarEventParsed, CalendarTimestamp, IValue
} from '../utils/calendar'
import { ITimes } from './type'
import { creatEvents, parseEvent } from '../utils/events'
import { CalendarEventOverlapModes } from '../utils/modes'

export function VisualContext(props:React.ProviderProps<any>):React.ReactElement {
  // Popover相关
  const [selectedRef, setRef] = useState<Element | null>(null)
  const [moving, setMoving] = useState<boolean>(false)
  const [createEvent, setCreateEvent] = useState<CalendarEvent| null>(null)





  const children = props.children
  const [now] = useState(Date.now())
  const [weekDays, setWeekDays] = useState<number[]>(DEFAULT_WEEK_DAYS)
  const [start, setStart] = useState<string>(parseTimeStamp(Date.now(), true)?.date as string)
  const [end, setEnd] = useState<string>(parseTimeStamp(Date.now(), true)?.date as string)
  const times = useMemo<ITimes>(() => ({
    now: parseTimeStamp(now, true),
    today: parseTimeStamp(now, true),
  }), [now])


  const [type, setType] = useState<string>(DEFAULT_TYPE)
  const [value, setValue] = useState<IValue>(DEFAULT_VALUE)

  const [maxDays, setMaxDays] = useState<number>(DEFAULT_MAX_DAYS)
  const [intervalHeight] = useState<number>(DEFAULT_INTERVALS.intervalHeight)
  const [intervalWidth] = useState<number>(DEFAULT_INTERVALS.intervalWidth)
  const [firstInterval] = useState<number>(DEFAULT_INTERVALS.firstInterval)
  const [intervalCount] = useState<number>(DEFAULT_INTERVALS.intervalCount)
  const [intervalMinutes] = useState<number>(DEFAULT_INTERVALS.intervalMinutes)



  const parsedStart = useMemo<CalendarTimestamp>(() => parseTimeStamp(start, true), [start])
  const parsedEnd = useMemo(() => {
    const newEnd = end ? parseTimeStamp(end, true) : parsedStart
    return getTimestampIdentifier(newEnd) < getTimestampIdentifier(parsedStart) ? parsedStart : newEnd
  }, [parsedStart, end])
  const parsedWeekdays = useMemo(() => weekDays, [weekDays])
  const parsedValue = useMemo<CalendarTimestamp>(() =>  (validateTimestamp(value) ?
    parseTimeStamp(value, true) :
    (parsedStart || times.today)), [value])
  const weekdaySkips = useMemo<number[]>(() => getWeekdaySkips(parsedWeekdays), [parsedWeekdays])


  const days = useMemo<CalendarTimestamp[]>(() => {
    const ds = createDayList(
      parsedStart, parsedEnd, times.today, weekdaySkips
    )
    return ds
  },
  [parsedStart, parsedEnd, times, weekdaySkips])




  const [minWeeks] = useState<number>(DEFAULT_WEEKS.minWeeks)


  const [events, setEvents] = useState<CalendarEvent[]>(creatEvents())
  const [eventStart] = useState(DEFAULT_EVENT.eventStart)
  const [eventEnd] = useState(DEFAULT_EVENT.eventEnd)
  const [eventTimed] = useState(DEFAULT_EVENT.eventTimed)
  const [eventOverlapMode] = useState(DEFAULT_EVENT.eventOverlapMode)
  const [eventOverlapThreshold] = useState(DEFAULT_EVENT.eventOverlapThreshold)
  const [eventHeight] = useState(DEFAULT_EVENT.eventHeight)
  const [eventMarginBottom] = useState(DEFAULT_EVENT.eventMarginBottom)
  const resetEvents = (oldEvent:CalendarEvent, newEvent:CalendarEvent):void => {
    const index = events.findIndex((e) => e === oldEvent)
    if (index > -1) {
      events.splice(
        index, 1, newEvent
      )
    } else {
      events.push(newEvent)
    }
    const newEvents = events.filter((i) => !!i)
    setEvents([...newEvents])
  }
  const parsedEvents = useMemo<CalendarEventParsed[]>(() => events.map((input, index) => parseEvent(
    input,
    index,
    eventStart,
    eventEnd,
    (!!input[eventTimed])
  )), [events, eventStart, eventEnd])
  const eventModeFunction = useMemo<CalendarEventOverlapMode>(() => CalendarEventOverlapModes[eventOverlapMode], [eventOverlapMode])




  return (
    <BaseContext.Provider value={{
      start,
      setStart,
      end,
      setEnd,
      weekDays,
      setWeekDays,
      times,
      parsedStart,
      parsedEnd,
      parsedWeekdays,
      parsedValue,
      weekdaySkips,
      days,
      selectedRef,
      setRef,
      moving,
      setMoving,
      createEvent,
      setCreateEvent,
    }}>
      <CalendarContext.Provider value={{
        type,
        setType,
        value,
        setValue,
      }}>
        <IntervalsContext.Provider value={{
          maxDays,
          setMaxDays,
          intervalHeight,
          intervalWidth,
          firstInterval,
          intervalCount,
          intervalMinutes,
        }}>
          <WeeksContext.Provider value={{
            minWeeks,
          }}>
            <EventContext.Provider value={{
              events,
              setEvents,
              eventStart,
              eventEnd,
              eventTimed,
              eventOverlapMode,
              eventOverlapThreshold,
              eventHeight,
              eventMarginBottom,
              parsedEvents,
              eventModeFunction,
              resetEvents,
            }}>
              {children}
            </EventContext.Provider>
          </WeeksContext.Provider>
        </IntervalsContext.Provider>
      </CalendarContext.Provider>
    </BaseContext.Provider>
  )
}
