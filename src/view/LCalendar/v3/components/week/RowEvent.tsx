import { CalendarEvent } from '../../../utils/calendar'
import { NO_NAME_EVENT_VALUE } from '../../../utils/time'
import style from './style/rowEvent.module.less'

interface IProps {
  slots:number
  span:number
  event:CalendarEvent
}
export function RowEvent(props:IProps) {
  const { slots, span, event, } = props
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
