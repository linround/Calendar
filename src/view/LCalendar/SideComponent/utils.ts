import { IMonthDay } from '../components/type'
import { CalendarTimestamp } from '../utils/calendar'
import { getDayIdentifier } from '../utils/timesStamp'

export function isActiveDay(monthDay:IMonthDay, value:CalendarTimestamp) {
  const selectedDay = getDayIdentifier(value)
  const day = getDayIdentifier(monthDay.day)
  return day === selectedDay
}

export interface ISimpleControllerProps {
  prev: (amount: number) => any
  next: (amount: number) => any
}
