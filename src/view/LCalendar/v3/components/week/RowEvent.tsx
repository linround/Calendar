import { CalendarEvent } from '../../../utils/calendar'
import style from './style/rowEvent.module.less'
import { IMonth } from '../../../components/type'
import { CommonRowEventWrapper } from '../common/CommonRowEventWrapper'
import { getDayTimeFromPoint } from '../../utils/point'
import { EVENT_DEFAULT_BG_TITLE } from '../../../utils/events'

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
    <CommonRowEventWrapper
      event={event}
      dates={month}
      getDateFromPoint={getDayTimeFromPoint}
      container={container}>
      <div
        className={style.rowEvent}
        style={{
          flexBasis: width,
          maxWidth: width,
          backgroundColor: bgColor,
        }}>
        {event.eventName || EVENT_DEFAULT_BG_TITLE}
      </div>
    </CommonRowEventWrapper>
  )

}
