import {
  CalendarEvent, CalendarEventParsed, CalendarTimestamp
} from './calendar'
import {
  isTimedLess, parseTimesStamp, updateHasTime,
  getDayIdentifier, getTimestampIdentifier
} from './timesStamp'

export function parsedEvent(
  input: CalendarEvent,
  index:number,
  startProperty: string,
  endProperty:string,
  timed = false,
  category: string | false = false
): CalendarEventParsed {
  const startInput = input[startProperty]
  const endInput = input[endProperty]
  const startParsed = parseTimesStamp(startInput, true)
  const endParsed = endInput ? parseTimesStamp(endInput, true) : startParsed


  const start:CalendarTimestamp = isTimedLess(startInput) ?
    updateHasTime(startParsed as CalendarTimestamp, timed) :
    startParsed
  const end:CalendarTimestamp = isTimedLess(endInput) ?
    updateHasTime(endParsed as CalendarTimestamp, timed) :
    endParsed

  const startIdentifier: number = getDayIdentifier(start)
  const startTimestampIdentifier: number = getTimestampIdentifier(start)

  const endIdentifier: number = getDayIdentifier(end)
  const endOffset: number = start.hasTime ? 0 : 2359

  return {} as CalendarEventParsed
}
