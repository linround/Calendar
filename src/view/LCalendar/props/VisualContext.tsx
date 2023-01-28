import {
  BaseContext, CalendarContext, DEFAULT_INTERVALS, IntervalsContext
} from './propsContext'
import React, { useMemo, useState } from 'react'
import {
  DEFAULT_MAX_DAYS, DEFAULT_TYPE, DEFAULT_WEEK_DAYS
} from '../utils/time'
import {
  createDayList,
  getTimestampIdentifier, getWeekdaySkips, parseTimeStamp, validateTimestamp
} from '../utils/timesStamp'
import { CalendarTimestamp, IValue } from '../utils/calendar'
import { ITimes } from './type'

export function VisualContext(props:React.ProviderProps<any>):React.ReactElement {
  const children = props.children
  const [weekDays, setWeekDays] = useState<number[]>(DEFAULT_WEEK_DAYS)
  const [start, setStart] = useState<string>(parseTimeStamp(Date.now(), true)?.date as string)
  const [end, setEnd] = useState<string>(parseTimeStamp(Date.now(), true)?.date as string)
  const [times] = useState<ITimes>({
    now: parseTimeStamp('0000-00-00 00:00', true),
    today: parseTimeStamp('0000-00-00', true),
  })


  const [type, setType] = useState<string>(DEFAULT_TYPE)
  const [value, setValue] = useState<IValue>('')

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
  }, [parsedStart])
  const parsedWeekdays = useMemo(() => weekDays, [weekDays])
  const parsedValue = useMemo<CalendarTimestamp>(() => (validateTimestamp(value) ?
    parseTimeStamp(value, true) :
    (parsedStart || times.today)), [value])
  const weekdaySkips = useMemo<number[]>(() => getWeekdaySkips(parsedWeekdays), [parsedWeekdays])
  const days = useMemo<CalendarTimestamp[]>(() => createDayList(
    parsedStart, parsedEnd, times.today, weekdaySkips
  ),
  [parsedStart, parsedEnd, times, weekdaySkips])


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
          {children}
        </IntervalsContext.Provider>
      </CalendarContext.Provider>
    </BaseContext.Provider>
  )
}
