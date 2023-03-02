import {
  useMemo,
  useContext
} from 'react'
import {
  BaseContext,
  WeeksContext
} from '../props/propsContext'
import {
  getEndOfWeek,
  createDayList,
  getEndOfMonth,
  getStartOfWeek,
  parseTimeStamp,
  timestampToDate,
  getStartOfMonth
} from '../utils/timesStamp'
import moment from 'moment/moment'
import { IMonth } from '../components/type'
import { CalendarTimestamp } from '../utils/calendar'
import { CommonMonthHeader } from '../components/CommonMonthHeader'

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
        <CommonMonthHeader
          parsedStart={parsedStart}
          parsedEnd={parsedEnd} />
        <div></div>
      </div>
    </>
  )
}
