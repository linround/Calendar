import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import React from 'react'
import { NO_NAME_EVENT_VALUE } from '../../../utils/time'
import style from '../week/style/rowEvent.module.less'
import { CommonRowEventWrapper } from '../common/CommonRowEventWrapper'
import { getDayTimeFromDaysPoint } from '../../utils/point'

interface IProps {
  slots:number
  span:number
  event:CalendarEvent
  days:CalendarTimestamp[]
  container:HTMLDivElement
}
export function HeaderRowEvent(props:React.PropsWithChildren<IProps>) {
  const {
    slots,
    days,
    span,
    event,
    container,
  } = props
  const width = ((Math.abs(span) / slots) * 100) + '%'
  const bgColor = event.eventColor
  return (
    <CommonRowEventWrapper
      event={event}
      dates={days}
      getDateFromPoint={getDayTimeFromDaysPoint}
      container={container}>
      <div
        className={style.rowEvent}
        style={{
          flexBasis: width,
          maxWidth: width,
          backgroundColor: bgColor,
        }}>
        {event.eventName || NO_NAME_EVENT_VALUE}
      </div>
    </CommonRowEventWrapper>
  )
}
