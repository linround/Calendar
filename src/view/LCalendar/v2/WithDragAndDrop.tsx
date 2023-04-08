import { Calendar } from './Calendar'
import {
  CalContext, IContextProps, IInteractingInfo
} from './context'
import { CalendarEvent } from '../utils/calendar'
import { useCallback, useState } from 'react'
import { createEvents } from './Day/events'

export interface IProps extends IContextProps{
  events: CalendarEvent[]

}
export function WithDragAndDrop() {
  const [events, setEvents] = useState<CalendarEvent[]>(createEvents)
  const moveEvent = useCallback(({ event, start, end, }:IInteractingInfo) => {
    setEvents((prevState) => {
      const existing = prevState.find((ev) => ev.id === event.id)
      const filtered = prevState.filter((ev) => ev.id !== event.id)
      return [...filtered, { ...existing, start, end, }]
    })
  }, [setEvents])
  return (
    <CalContext
      onEventResize={moveEvent}
      onEventDrop={moveEvent}
      draggableAccessor='isDraggable'
    >
      <Calendar events={events} />
    </CalContext>
  )
}
