
import { CalendarEvent, VTimestampInput } from '../calendar'
import { endOfRange } from './helper'
import { ILocalizer } from './localizer'
import { IAccessors } from './accessors'


export function inRange(
  e:CalendarEvent, start:VTimestampInput, end:VTimestampInput,
  accessors:IAccessors, localizer:ILocalizer
) {
  const event = {
    start: accessors.start(e),
    end: accessors.end(e),
  }
  const range = { start, end, }
  return localizer.inEventRange({ event, range, })
}
export function eventsForWeek(
  events:CalendarEvent[], start:VTimestampInput, end:VTimestampInput,
  accessors:IAccessors, localizer:ILocalizer
) {
  return events.filter((event) => inRange(
    event, start, end, accessors, localizer
  ))
}
export function eventSegments (
  event: CalendarEvent, range:VTimestampInput[], accessors:IAccessors, localizer:ILocalizer
) {
  const { first, last, } = endOfRange({ dateRange: range, localizer, })
  const slots = localizer.diff(
    first, last, 'day'
  )
  const start = localizer.max(localizer.startOf(accessors.start(event), 'day'), first)
  const end = localizer.min(localizer.ceil(accessors.end(event), 'day'), last)
  const padding = range.findIndex((day) => localizer.isSameDate(day, start))
  let span = localizer.diff(
    start, end, 'day'
  )
  span = Math.min(span, slots)
  span = Math.max(span - localizer.segmentOffset, 1)
  return {
    event,
    span,
    left: (padding + 1),
    right: Math.max(padding + span, 1),
  }
}



export function sortEvents(
  eventA:CalendarEvent, eventB:CalendarEvent, accessors:IAccessors, localizer:ILocalizer
):number {
  const evtA = {
    start: accessors.start(eventA),
    end: accessors.end(eventA),
    allDay: accessors.allDay(eventA),
  }
  const evtB = {
    start: accessors.start(eventB),
    end: accessors.end(eventB),
    allDay: accessors.allDay(eventB),
  }
  return +localizer.sortEvents({ evtA, evtB, })
}


