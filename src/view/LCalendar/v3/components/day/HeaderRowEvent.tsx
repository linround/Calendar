import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import React from 'react'
import { NO_NAME_EVENT_VALUE } from '../../../utils/time'
import style from '../week/style/rowEvent.module.less'

interface IProps {
  slots:number
  span:number
  event:CalendarEvent
  days:CalendarTimestamp[]
}
export function HeaderRowEvent(props:React.PropsWithChildren<IProps>) {
  const {
    slots,
    days,
    span,
    event,
  } = props
  const width = ((Math.abs(span) / slots) * 100) + '%'
  const bgColor = event.eventColor
  return (
    <div
      className={style.rowEvent}
      style={{
        flexBasis: width,
        maxWidth: width,
        backgroundColor: bgColor,
      }}>
      {event.eventName || NO_NAME_EVENT_VALUE}
    </div>
  )
}
