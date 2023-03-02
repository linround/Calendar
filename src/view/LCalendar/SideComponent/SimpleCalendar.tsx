import React, {
  useMemo,
  useContext
} from 'react'
import {
  BaseContext,
  WeeksContext
} from '../props/propsContext'
import {
  getEndOfWeek,
  createDayList,
  getEndOfMonth,
  getStartOfWeek,
  parseTimeStamp,
  timestampToDate,
  getStartOfMonth,
  getWeekdaySkips
} from '../utils/timesStamp'
import moment from 'moment/moment'
import { IMonth } from '../components/type'
import { DEFAULT_WEEK_DAYS } from '../utils/time'
import { SimpleMonthBody } from './SimpleMonthBody'
import { CalendarTimestamp } from '../utils/calendar'
import simpleStyles from './styleSimpleMonth.module.less'
import { CommonMonthHeader } from '../components/CommonMonthHeader'

export function SimpleCalendar() {

  const weekdaySkips = getWeekdaySkips(DEFAULT_WEEK_DAYS)
  const { start, end,  times,  } = useContext(BaseContext)
  const parsedStart = useMemo(() => getStartOfMonth(parseTimeStamp(start, true)),
    [start])
  const parsedEnd = useMemo(() => getEndOfMonth(parseTimeStamp(end, true)),
    [end])
  const { maxWeeks, } = useContext(WeeksContext)
  const days = useMemo(() => {
    const maxDays = maxWeeks * DEFAULT_WEEK_DAYS.length
    const newStart = getStartOfWeek(
      parsedStart, DEFAULT_WEEK_DAYS, times?.today
    )
    const newEnd = getEndOfWeek(
      parsedEnd, DEFAULT_WEEK_DAYS, times?.today
    )
    return createDayList(
      newStart,
      newEnd,
      times?.today as CalendarTimestamp,
      weekdaySkips,
      maxDays,
      maxDays
    )
  }, [maxWeeks, DEFAULT_WEEK_DAYS, parsedStart, parsedEnd,  times])

  const month:IMonth = useMemo(() => {
    const weeks:IMonth = []
    const weekDays = DEFAULT_WEEK_DAYS.length
    for (let i = 0; i < days.length;i += weekDays) {
      const week = days.slice(i, i + weekDays)
      weeks.push(week.map((day) => ({
        value: moment(timestampToDate(day))
          .startOf('day')
          .valueOf(),
        day,
      })))
    }
    return weeks
  }, [days])

  return (
    <>

      <div className={simpleStyles.container}>
        <CommonMonthHeader
          parsedStart={parsedStart}
          parsedEnd={parsedEnd} />
        <SimpleMonthBody month={month} />
      </div>
    </>
  )
}
