import monthStyle from './month.module.less'
import React, { useContext, useMemo } from 'react'
import { CalendarTimestamp } from '../utils/calendar'
import { CommonWeekHeadColumn } from './CommonWeekHeadColumn'
import {
  createDayList, getEndOfWeek, getStartOfWeek
} from '../utils/timesStamp'
import { BaseContext } from '../props/propsContext'


interface IProps {
  parsedStart: CalendarTimestamp,
  parsedEnd:CalendarTimestamp
}
export function CommonMonthHeader(props: IProps) {
  const {  parsedStart, parsedEnd, } = props
  const {  parsedWeekdays, times, weekdaySkips, } = useContext(BaseContext)
  const todayWeek = useMemo(() => {
    const today = times?.today as CalendarTimestamp
    const newStart = getStartOfWeek(
      today, parsedWeekdays, today
    )
    const newEnd = getEndOfWeek(
      today, parsedWeekdays, today
    )
    return createDayList(
      newStart,
      newEnd,
      today,
      weekdaySkips,
      parsedWeekdays.length,
      parsedWeekdays.length
    )
  }, [times, parsedWeekdays, weekdaySkips])
  return (

    <div className={monthStyle.monthHeader}>
      {
        todayWeek.map((day, index) => (
          <div  key={day.date} className={monthStyle.monthHeaderColumn}>
            <CommonWeekHeadColumn
              day={day}
              index={index}
              parsedEnd={parsedEnd}
              parsedStart={parsedStart} />
          </div>
        ))
      }
    </div>
  )
}
