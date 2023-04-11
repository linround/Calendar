import style from './style/dayBody.module.less'
import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import React from 'react'
import { V3DayColumnWrapperComponent } from './DayColumnWrapper'
import dayStyle from '../../../components/day.module.less'
interface IProps {
  intervals:CalendarTimestamp[][]
  intervalWidth:number
  intervalHeight:number
  days:CalendarTimestamp[]
  events:CalendarEvent[]
}
export function V3DayColumnComponent(props:React.PropsWithChildren<IProps>) {
  const { intervals, intervalHeight, days, } = props
  const dayInterval = intervals[0] || []
  return (
    days.map((day, idx) => (
      <V3DayColumnWrapperComponent key={idx}>
        <div className={style.dayBody}>
          {/*网格子*/}
          {dayInterval.map((interval, index) => (
            <div className={style.dayBodyInterval}
              style={{ height: intervalHeight, }}
              key={index} />))}
          {props.children}
        </div>
      </V3DayColumnWrapperComponent>
    ))

  )
}
