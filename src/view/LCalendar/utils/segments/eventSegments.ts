import { CalendarEvent, VTimestampInput } from '../calendar'
import { endOfRange } from './helper'
import { ILocalizer } from './localizer'


export function eventSegments (
  event: CalendarEvent, range:VTimestampInput[], accessors, localizer:ILocalizer
) {
  const { first, last, } = endOfRange({ dateRange: range, localizer, })
  const slots = localizer.diff(
    first, last, 'day'
  )
  const start = localizer.max(localizer.startOf(accessors.start(event), 'day'), first)
  const end = localizer.min(localizer.ceil())
}
