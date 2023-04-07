import { VIEWS } from './Views'
import { CalendarEvent } from '../utils/calendar'

export interface IBaseProps {
  events: CalendarEvent[]
}
function View(props:IBaseProps) {
  const name = 'day'
  const CalendarView = VIEWS[name]

  return (
    <CalendarView {...props} />
  )
}

export function Calendar(props:IBaseProps) {
  return (
    <>
      <View {...props} />
    </>
  )
}
