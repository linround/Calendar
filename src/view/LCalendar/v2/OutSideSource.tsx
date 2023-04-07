import { WithDragAndDrop } from './WithDragAndDrop'
import { useCallback, useState } from 'react'
import { createEvents } from './Day/events'
import { IInteractingInfo } from './context'
import { CalendarEvent } from '../utils/calendar'

export function V2OutSideSource() {
  const [events, setEvents] = useState<CalendarEvent[]>(createEvents)
  const moveEvent = useCallback(({ event, start, end, }:IInteractingInfo) => {
    setEvents((prevState) => {
      const existing = prevState.find((ev) => ev.id === event.id)
      const filtered = prevState.filter((ev) => ev.id !== event.id)
      return [...filtered, { ...existing, start, end, }]
    })
  }, [setEvents])
  return (
    <div style={{
      height: 800,
    }}>
      <WithDragAndDrop
        events={events}
        onEventDrop={moveEvent}
        onEventResize={moveEvent}
        draggableAccessor='isDraggable' />
    </div>
  )
}
