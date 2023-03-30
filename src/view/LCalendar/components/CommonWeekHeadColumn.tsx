import React from 'react'
import { IWeekHeadColumn } from './type'
import {  weekdayFormatter } from '../utils/timesStamp'
import dayStyle from '../components/day.module.less'

export function CommonWeekHeadColumn(props: React.PropsWithChildren<IWeekHeadColumn>) {
  const { day,  } = props

  const weekText = weekdayFormatter(day)
  return (
    <div className={dayStyle.dayHeaderDayLabel}>
      {weekText}
    </div>
  )
}
