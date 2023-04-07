import { Calendar } from './Calendar'
import { CalContext, IContextProps } from './context'
import { CalendarEvent } from '../utils/calendar'

export interface IProps extends IContextProps{
  events: CalendarEvent[]

}
export function WithDragAndDrop(props:IProps) {
  return (
    <CalContext {...props}>
      <Calendar {...props} />
    </CalContext>
  )
}
