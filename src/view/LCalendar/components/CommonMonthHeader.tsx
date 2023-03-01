import monthStyle from './month.module.less'
import React from 'react'
import { CalendarTimestamp } from '../utils/calendar'
import { CommonWeekHeadColumn } from './CommonWeekHeadColumn'


interface IProps {
  todayWeek: CalendarTimestamp[]
  parsedStart: CalendarTimestamp,
  parsedEnd:CalendarTimestamp
}
export function CommonMonthHeader(props: IProps) {
  const { todayWeek, parsedStart, parsedEnd, } = props
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
