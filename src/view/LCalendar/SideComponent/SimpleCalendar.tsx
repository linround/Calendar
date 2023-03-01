import { useContext, useMemo } from 'react'
import { BaseContext, WeeksContext } from '../props/propsContext'
import {
  createDayList,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  parseTimeStamp, timestampToDate
} from '../utils/timesStamp'
import { CalendarTimestamp } from '../utils/calendar'
import { IMonth } from '../components/type'
import moment from 'moment/moment'

export function SimpleCalendar() {

  const { start, end, parsedWeekdays, times, weekdaySkips, } = useContext(BaseContext)
  const parsedStart = useMemo(() => getStartOfMonth(parseTimeStamp(start, true)),
    [start])
  const parsedEnd = useMemo(() => getEndOfMonth(parseTimeStamp(end, true)),
    [end])
  const { maxWeeks, } = useContext(WeeksContext)
  const days = useMemo(() => {
    const maxDays = maxWeeks * parsedWeekdays.length
    const newStart = getStartOfWeek(
      parsedStart, parsedWeekdays, times?.today
    )
    const newEnd = getEndOfWeek(
      parsedEnd, parsedWeekdays, times?.today
    )
    return createDayList(
      newStart,
      newEnd,
      times?.today as CalendarTimestamp,
      weekdaySkips,
      maxDays,
      maxDays
    )
  }, [maxWeeks, parsedWeekdays, parsedStart, parsedEnd,  times])

  const month = useMemo(() => {
    const arr:IMonth = []
    const weekDays = parsedWeekdays.length
    for (let i = 0; i < days.length;i += weekDays) {
      const week = days.slice(i, i + weekDays)
      arr.push(week.map((day) => ({
        value: moment(timestampToDate(day))
          .startOf('day')
          .valueOf(),
        day,
      })))
    }
    return arr
  }, [days])


  return (
    <>
      {month[0][0].day.date}
    </>
  )
}
