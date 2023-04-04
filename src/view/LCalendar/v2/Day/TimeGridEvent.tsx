import { IEventStyle } from '../utils/overlap'
import { CalendarEvent } from '../../utils/calendar'
import styles from './style/timeGridEvent.module.less'

function stringifyPercent(v:number):string {
  return typeof v === 'string' ? v : (v + '%')
}
interface ITimeGridEvent{
  label:string
  style:IEventStyle
  event:CalendarEvent
}
export function TimeGridEvent(props:ITimeGridEvent) {
  const { label, style, } = props
  const  { height, top, width, xOffset, } = style
  const eventStyle = {
    height: stringifyPercent(height),
    width: stringifyPercent(width),
    top: stringifyPercent(top),
    left: stringifyPercent(xOffset),
  }
  return (
    <div style={eventStyle} className={styles.v2Event}>
      {label}
    </div>
  )
}
