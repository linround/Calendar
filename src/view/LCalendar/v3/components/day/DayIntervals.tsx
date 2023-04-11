import React from 'react'
import { CalendarTimestamp } from '../../../utils/calendar'
import { getTimestampLabel } from '../../../utils/timesStamp'
import style from './style/dayIntervals.module.less'

interface IProps {
  intervals:CalendarTimestamp[][]
  intervalWidth:number
  intervalHeight:number
}
export function V3DayIntervals(props:React.PropsWithChildren<IProps>) {
  const { intervals, intervalWidth, intervalHeight, } = props
  const dayTimeInterval = intervals[0] || []
  return (
    <div className={style.intervalsContainer} style={{ width: intervalWidth, }}>
      {
        dayTimeInterval.map((interval) => (
          <div
            className={style.intervalsItem}
            key={interval.time}
            style={{ height: intervalHeight, }}>
            <div className={style.intervalsItemText}>
              {getTimestampLabel(interval)}
            </div>
          </div>
        ))
      }
    </div>
  )
}
