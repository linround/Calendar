import { CalendarEvent } from '../../../utils/calendar'
import { NO_NAME_EVENT_VALUE } from '../../../utils/time'
import style from './style/rowEvent.module.less'
import { RowEventWrapper } from './RowEventWrapper'
import { IMonth } from '../../../components/type'

interface IProps {
  slots:number
  span:number
  event:CalendarEvent
  container:HTMLDivElement
  month:IMonth
}
export function RowEvent(props:IProps) {
  const {
    slots,
    span,
    event,
    container,
    month,
  } = props
  const width = ((Math.abs(span) / slots) * 100) + '%'
  const bgColor = event.eventColor

  return (
    <RowEventWrapper
      event={event}
      month={month}
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
    </RowEventWrapper>
  )

}
