import monthStyle from './month.module.less'
import React, { useContext, useMemo } from 'react'
import { CalendarTimestamp } from '../utils/calendar'
import { CommonWeekHeadColumn } from './CommonWeekHeadColumn'
import {
  createDayList, getEndOfWeek, getStartOfWeek, getWeekdaySkips
} from '../utils/timesStamp'
import { BaseContext } from '../props/propsContext'
import { DEFAULT_WEEK_DAYS } from '../utils/time'


export function CommonMonthHeader() {
  const {  times, } = useContext(BaseContext)
  const weekdaySkips = getWeekdaySkips(DEFAULT_WEEK_DAYS)
  const todayWeek = useMemo(() => {
    const today = times?.today as CalendarTimestamp
    const newStart = getStartOfWeek(
      today, DEFAULT_WEEK_DAYS, today
    )
    const newEnd = getEndOfWeek(
      today, DEFAULT_WEEK_DAYS, today
    )
    return createDayList(
      newStart,
      newEnd,
      today,
      weekdaySkips,
      DEFAULT_WEEK_DAYS.length,
      DEFAULT_WEEK_DAYS.length
    )
  }, [weekdaySkips])
  return (
    <div className={monthStyle.monthHeader}>
      {todayWeek.map((day, index) => (
        <div  key={day.date} className={monthStyle.monthHeaderColumn}>
          <CommonWeekHeadColumn
            day={day}
            index={index} />
        </div>
      ))}
    </div>
  )
}
