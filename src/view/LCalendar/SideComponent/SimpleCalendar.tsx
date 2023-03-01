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
    const weeks:IMonth = []
    const weekDays = parsedWeekdays.length
    for (let i = 0; i < days.length;i += weekDays) {
      const week = days.slice(i, i + weekDays)
      weeks.push(week.map((day) => ({
        value: moment(timestampToDate(day))
          .startOf('day')
          .valueOf(),
        day,
      })))
    }
    return weeks
  }, [days])


  return (
    <>
      <div>
        <div></div>
        <div></div>
      </div>
      {month[0][0].day.date}
    </>
  )
}
