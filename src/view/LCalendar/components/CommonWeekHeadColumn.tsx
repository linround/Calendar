import React from 'react'
import { IWeekHeadColumn } from './type'
import { isOutSide, weekdayFormatter } from '../utils/timesStamp'
import classnames from 'classnames'
import weekStyle from './week.module.less'

export function CommonWeekHeadColumn(props: React.PropsWithChildren<IWeekHeadColumn>) {
  const { day, parsedStart, parsedEnd, } = props
  const outSide = isOutSide(
    day, parsedStart, parsedEnd
  )
  const weekText = weekdayFormatter(day)
  const className = classnames({
    [weekStyle.isPresent]: day.present,
    [weekStyle.isPast]: day.past,
    [weekStyle.isFuture]: day.future,
    [weekStyle.isOutside]: outSide,
  })
  return (
    <div className={className}>
      {weekText}
    </div>
  )
}
