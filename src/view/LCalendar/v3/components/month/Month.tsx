import { V3WeekComponent } from '../week/Week'
import { CommonMonthHeader } from '../../../components/CommonMonthHeader'
import {
  useContext, useEffect, useMemo, useRef, useState
} from 'react'
import {
  BaseContext, EventContext, MouseEventContext, WeeksContext
} from '../../../props/propsContext'
import {
  createDayList,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  parseTimeStamp,
  timestampToDate
} from '../../../utils/timesStamp'
import style from './style/month.module.less'
import { CalendarTimestamp } from '../../../utils/calendar'
import { IMonth } from '../../../components/type'
import moment from 'moment/moment'
import { MonthWrapper } from './MonthWrapper'

export function V3MonthComponent() {
  // 还需要处理maxRows和minRows的来源
  const [maxRows] = useState(3)
  const [minRows] = useState(0)

  const {
    start,
    end,
    parsedWeekdays,
    times,
    weekdaySkips,
  } = useContext(BaseContext)
  const {  events, } = useContext(EventContext)
  const { minWeeks, } = useContext(WeeksContext)

  const parsedStart = useMemo(() => getStartOfMonth(parseTimeStamp(start, true)),
    [start])
  const parsedEnd = useMemo(() => getEndOfMonth(parseTimeStamp(end, true)),
    [end])

  const days = useMemo(() => {
    const minDays = minWeeks * parsedWeekdays.length
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
      Number.MAX_SAFE_INTEGER,
      minDays
    )
  }, [minWeeks, parsedWeekdays, parsedStart, parsedEnd,  times])


  const weekDays = parsedWeekdays.length
  const month: IMonth = []
  for (let i = 0; i < days.length;i += weekDays) {
    const week = days.slice(i, i + weekDays)
    month.push(week.map((day) => ({
      value: moment(timestampToDate(day))
        .startOf('day')
        .valueOf(),
      day,
    })))
  }



  // 存储该scroll滚动容器
  const containerRef = useRef<HTMLDivElement|null>(null)
  const { setDayScrollRef, } = useContext(MouseEventContext)
  useEffect(() => {
    if (containerRef) {
      setDayScrollRef(containerRef.current)
    }
  }, [containerRef])
  return (
    <div className={style.monthContainer}>
      <CommonMonthHeader parsedStart={parsedStart} parsedEnd={parsedEnd} />
      <MonthWrapper
        month={month}
        container={containerRef.current as HTMLDivElement}>
        <div className={style.monthBody} ref={containerRef} >
          {month.map((weekDays, index) => (
            <V3WeekComponent
              key={index}
              events={events}
              weekDays={weekDays}
              maxRows={maxRows}
              minRows={minRows}
            />
          ))}
        </div>
      </MonthWrapper>
    </div>
  )
}
