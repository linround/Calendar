import { stack } from '../../utils/modes/stack'
import {
  CalendarDayBodySlotScope, CalendarEventParsed, CalendarTimestamp
} from '../../utils/calendar'
import { DEFAULT_WEEK_DAYS } from '../../utils/time'
import { DEFAULT_EVENT } from '../../props/propsContext'
import { CalendarEventVisual } from '../../utils/modes/common'
import {
  genTimedEvents, IEventsRect, isEventOn
} from '../../utils/events'
import { getDayIdentifier } from '../../utils/timesStamp'

export function getVisualsRect(
  day:CalendarTimestamp,
  events:CalendarEventParsed[],
  getSlotScope:(timestamp:CalendarTimestamp)=>CalendarDayBodySlotScope
):IEventsRect[] {
  const overLap = stack(
    events, DEFAULT_WEEK_DAYS[0], DEFAULT_EVENT.eventOverlapThreshold
  )
  const dayScope = getSlotScope(day)

  const identifier = getDayIdentifier(day)
  const dayEvents = events.filter((event) => !event.allDay && isEventOn(event, identifier))
  const visuals = overLap(
    dayScope, dayEvents, true, false
  )
  const visualsRect = visuals.map((visual: CalendarEventVisual) => genTimedEvents(visual,
    dayScope))
    .filter((i) => i) as IEventsRect[]
  return visualsRect

}
