import style from './style/headerContent.module.less'
import React from 'react'
import { CalendarEventParsed, CalendarTimestamp } from '../../../utils/calendar'

interface IProps {
  intervalWidth: number
  height:number
  days:CalendarTimestamp[]
  events:CalendarEventParsed[]
}
export function HeaderContent(props:React.PropsWithChildren<IProps>) {
  const {
    intervalWidth,
    height,
    days,
    events,
  } = props
  return (
    <div className={style.headerContent} style={{ marginRight: 10, }}>
      <div className={style.headerContentInterVals} style={{ width: intervalWidth, height, }} >
        全天
      </div>
      {days.map((day) => (
        <div className={style.headerContentItem} key={day.date}>{day.date}</div>
      ))}
    </div>
  )
}
