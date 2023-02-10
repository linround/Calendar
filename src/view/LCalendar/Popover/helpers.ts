import { VTimestampInput } from '../utils/calendar'
import localizer from '../utils/segments/localizer'
import { WEEK_DAYS_TEXT } from '../utils/time'
import { padNumber } from '../utils/timesStamp'




export const POPOVER_WIDTH_DEF = 300

const joiner = '~'
export function getEventTimeLabel(start:VTimestampInput, end:VTimestampInput):string {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const startHour = padNumber(startDate.getHours(), 2)
  const startMinute = padNumber(startDate.getMinutes(), 2)

  const endHour = padNumber(endDate.getHours(), 2)
  const endMinute = padNumber(endDate.getMinutes(), 2)
  return `${startHour}:${startMinute}${joiner}${endHour}:${endMinute}`
}
export function getEventDayLabel(start:VTimestampInput, end:VTimestampInput):string {

  const startDate = new Date(start)
  const endDate = new Date(end)

  const startYear:string|number = `${startDate.getFullYear()}年`
  const startMonth:string|number = `${startDate.getMonth() + 1}月`
  const startDay:string|number = `${startDate.getDate()}日`

  const endYear:string|number = `${endDate.getFullYear()}年`
  const endMonth:string|number = `${endDate.getMonth() + 1}月`
  const endDay:string|number = `${endDate.getDate()}日`

  const weekday:string|number = `周${WEEK_DAYS_TEXT[startDate.getDay()]}`

  if (localizer.eq(
    start, end, 'year'
  )) {
    if (localizer.eq(
      start, end, 'month'
    )) {
      if (localizer.eq(
        start, end, 'day'
      )) {
      //  同年同月同日
        return `${startYear}${startMonth}${startDay} ${weekday}`
      }
      //  同年同月不同日
      return `${startYear}${startMonth}${startDay}${joiner}${endDay}`
    }
    //  同年不同月
    return `${startYear}${startMonth}${startDay}${joiner}${endMonth}${endDay}`
  }
  // 不同年
  return `${startYear}${startMonth}${startDay}${joiner}${endYear}${endMonth}${endDay} ${weekday}`

}
