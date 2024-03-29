import { IEventStyle } from '../utils/overlap'
import { CalendarEvent } from '../../utils/calendar'
import styles from './style/timeGridEvent.module.less'
import classnames from 'classnames'
import { eventItem } from '../utils/day'
import { EventWrapper } from './EventWrapper'

function stringifyPercent(v:number):string {
  return typeof v === 'string' ? v : (v + '%')
}
interface ITimeGridEvent{
  label:string
  style:IEventStyle
  event:CalendarEvent
}
export function TimeGridEvent(props:ITimeGridEvent) {
  const { label, style, event, } = props
  const  { height, top, width, xOffset, } = style
  const eventStyle = {
    height: stringifyPercent(height),
    width: stringifyPercent(width),
    top: stringifyPercent(top),
    left: stringifyPercent(xOffset),
  }
  return (
    <EventWrapper
      event={event}
      type='time'>
      <div style={eventStyle} className={classnames({
        [styles.v2Event]: true,
        [eventItem]: true,
      })}>
        {label}
      </div>
    </EventWrapper>

  )
}
