import React, { useContext, useMemo } from 'react'
import { V3MonthComponent } from '../v3/components/month/Month'
import {
  BaseContext, EventContext, WeeksContext
} from '../props/propsContext'
import {
  createDayList,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  parseTimeStamp
} from '../utils/timesStamp'
import { CalendarTimestamp } from '../utils/calendar'

export const MonthWrapper = () => {
  const {
    start,
    end,
    parsedWeekdays,
    times,
    weekdaySkips,
  } = useContext(BaseContext)
  const {  events, } = useContext(EventContext)
  const { minWeeks, } = useContext(WeeksContext)
  const parsedStart = useMemo(() => getStartOfMonth(parseTimeStamp(start, true)),
    [start])
  const parsedEnd = useMemo(() => getEndOfMonth(parseTimeStamp(end, true)),
    [end])
  const days = useMemo(() => {
    const minDays = minWeeks * parsedWeekdays.length
    const newStart = getStartOfWeek(
      parsedStart, parsedWeekdays, times?.today
    )
    const newEnd = getEndOfWeek(
      parsedEnd, parsedWeekdays, times?.today
    )
    return createDayList(
      newStart,
      newEnd,
      times?.today as CalendarTimestamp,
      weekdaySkips,
      Number.MAX_SAFE_INTEGER,
      minDays
    )
  }, [minWeeks, parsedWeekdays, parsedStart, parsedEnd,  times])
  return (
    <>
      <V3MonthComponent
        events={events}
        days={days}
      />
    </>

  )
}
