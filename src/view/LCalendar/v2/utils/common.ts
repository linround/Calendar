import { IBounds, IEventCoordinatesData } from './selection'
import { CalendarEvent } from '../../utils/calendar'
import { accessors } from '../../utils/segments/accessors'
import localizer from '../../utils/segments/localizer'

export function pointInColumn(bounds:IBounds, point:IEventCoordinatesData):boolean {
  const { left, right, top, } = bounds
  const { x, y, } = point
  return x < (right + 10) && x > left && y > top
}

export function eventTimes(event:CalendarEvent) {
  const start = accessors.start(event)
  let end = accessors.end(event)
  const isZeroDuration = localizer.eq(
    start, end, 'minutes'
  ) &&
    localizer.diff(
      start, end, 'minutes'
    ) === 0
  if (isZeroDuration) {
    end = localizer.add(
      end, 1, 'day'
    )
  }
  const duration = localizer.diff(
    start, end, 'milliseconds'
  )
  return {
    start, end, duration,
  }
}
