import {
  CalendarEvent, CalendarEventParsed, CalendarTimestamp
} from './calendar'
import {
  isTimedLess, parseTimesStamp, updateHasTime,
  getDayIdentifier, getTimestampIdentifier
} from './timesStamp'

export function parseEvent(
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
    startParsed as CalendarTimestamp
  const end:CalendarTimestamp = isTimedLess(endInput) ?
    updateHasTime(endParsed as CalendarTimestamp, timed) :
    endParsed as CalendarTimestamp

  const startIdentifier: number = getDayIdentifier(start)
  const startTimestampIdentifier: number = getTimestampIdentifier(start)

  const endIdentifier: number = getDayIdentifier(end)
  // 2359
  const endOffset: number = start.hasTime ? 0 : 2359
  const endTimestampIdentifier: number = getTimestampIdentifier(end) + endOffset

  const allDay = !start.hasTime
  return {
    input,
    start,
    startIdentifier,
    startTimestampIdentifier,
    end,
    endIdentifier,
    endTimestampIdentifier,
    allDay,
    index,
    category,
  }

}

// 判断时间是否在这天有交集
export function isEventOn(event:CalendarEventParsed, dayIdentifier:number):boolean {
  // 都是以日为单位
  return event.startIdentifier <= dayIdentifier && event.endIdentifier >= dayIdentifier
}
