import { CalendarEvent } from '../../utils/calendar'
import { accessors } from '../../utils/segments/accessors'
import localizer from '../../utils/segments/localizer'

export function inRange(
  e:CalendarEvent, start:Date, end:Date
) {
  const event = {
    start: accessors.start(e),
    end: accessors.end(e),
  }
  const range = { start, end, }
  return localizer.inEventRange({ event, range, })
}
