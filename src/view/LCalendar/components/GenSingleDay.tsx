import { CalendarTimestamp, VTimestampInput } from '../utils/calendar'
import React from 'react'
import monthStyle from './month.module.less'

interface IGenDayProp {
  day:{ value:VTimestampInput, day:CalendarTimestamp }
}
export function GenSingleDay(props:React.PropsWithChildren<IGenDayProp>) {
  const { day, } = props
  return (
    <div className={monthStyle.monthWeekDay}>
      {day.day.day}
    </div>
  )
}
