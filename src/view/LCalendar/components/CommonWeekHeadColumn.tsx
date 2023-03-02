import React from 'react'
import { IWeekHeadColumn } from './type'
import {  weekdayFormatter } from '../utils/timesStamp'
import classnames from 'classnames'
import weekStyle from './week.module.less'

export function CommonWeekHeadColumn(props: React.PropsWithChildren<IWeekHeadColumn>) {
  const { day,  } = props

  const weekText = weekdayFormatter(day)
  const className = classnames({
    [weekStyle.weekContainer]: true,
  })
  return (
    <div className={className}>
      {weekText}
    </div>
  )
}
