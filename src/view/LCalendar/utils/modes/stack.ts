import { CalendarEventOverlapMode } from '../calendar'
export const stack:CalendarEventOverlapMode = (
  events,
  firstWeekday,
  overlapThreshold
) => {
  const handler = getOverlapGroupHandler(firstWeekday)
  return (
    day, dayEvents, timed, reset
  ) => {}
}
