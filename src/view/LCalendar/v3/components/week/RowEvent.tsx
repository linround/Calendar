import { CalendarEvent } from '../../../utils/calendar'
import { NO_NAME_EVENT_VALUE } from '../../../utils/time'
import style from './style/rowEvent.module.less'
import {
  createRef, useContext, useEffect
} from 'react'
import { MouseEventContext } from '../../../props/propsContext'

interface IProps {
  slots:number
  span:number
  event:CalendarEvent
}
export function RowEvent(props:IProps) {
  const { slots, span, event, } = props
  const width = ((Math.abs(span) / slots) * 100) + '%'
  const bgColor = event.eventColor
  const isCreate = event.isCreate
  const ref = createRef<HTMLDivElement>()
  const {
    setCreatePopoverRefV3,
  } = useContext(MouseEventContext)
  useEffect(() => {
    if (ref.current) {
      setCreatePopoverRefV3(ref.current)
    }
  }, [ref])
  return (
    <div
      ref={isCreate ? ref : null}
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
