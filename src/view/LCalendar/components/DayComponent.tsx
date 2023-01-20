import dayStyle from './day.module.less'
import { IDayProps } from './dayPropsType'
import { Button } from 'antd'
import {
  parseDate,
  parseTimesStamp,
  getTimestampIdentifier,
  getWeekdaySkips,
  createDayList
} from '../utils/timesStamp'
import { useMemo, useState } from 'react'
import { CalendarTimestamp } from '../utils/calendar'

export default function (props: IDayProps) {
  const {
    intervalWidth = 60,
    start = parseDate(new Date()).date,
    end,
    maxDays = 7,
    weekdays = [0, 1, 2, 3, 4, 5, 6],
  } = props

  const [times] = useState<{now:CalendarTimestamp | null, today:CalendarTimestamp | null}>({
    now: parseTimesStamp('0000-00-00 00:00', true),
    today: parseTimesStamp('0000-00-00', true),
  })



  const parsedStart = useMemo(() => parseTimesStamp(start, true), [start]) as CalendarTimestamp
  const parsedEnd = useMemo(() => {
    const start:CalendarTimestamp = parsedStart as CalendarTimestamp
    const endVal:CalendarTimestamp = end ? parseTimesStamp(end) || start : start
    return getTimestampIdentifier(endVal) < getTimestampIdentifier(start) ? start : endVal
  }, [parsedStart, end])
  const parsedWeekdays = useMemo<number[]>(() => (Array.isArray(weekdays) ? weekdays :
    (weekdays || '').split(',')
      .map((x) => parseInt(x, 10))), [weekdays])
  const weekdaySkips = useMemo<number[]>(() => getWeekdaySkips(parsedWeekdays), [parsedWeekdays])
  const today = times.today
  const days: CalendarTimestamp[] = useMemo<CalendarTimestamp[]>(() => createDayList(
    parsedStart,
    parsedEnd,
    today as CalendarTimestamp,
    weekdaySkips,
    maxDays
  ), [
    parsedStart,
    parsedEnd,
    today,
    weekdaySkips,
    maxDays
  ])


  // 点击事件
  const onHeaderClick = (day:CalendarTimestamp) => {
    console.log(day)
  }
  return (
    <div className={dayStyle.dayContainer}>
      <div className={dayStyle.dayHeader} style={{ marginRight: 17, }}>
        <div className={dayStyle.dayHeaderIntervals} style={{ width: intervalWidth, }}></div>
        {
          days.map((day) => (
            <div className={dayStyle.dayHeaderDay} key={day.date} >
              <div>
                {day.weekday}
              </div>
              <div>
                <Button
                  type='primary'
                  onClick={() => onHeaderClick(day)}
                  shape='circle'>
                  {day.day}</Button>
              </div>
            </div>
          ))
        }
      </div>
      <div className={dayStyle.dayBody}>
        <div className={dayStyle.dayBodyScrollArea}>
          <div className={dayStyle.dayBodyPane} style={{ height: 48 * 24, }}>
            <div className={dayStyle.dayBodyDayContainer}>
              <div className={dayStyle.dayBodyIntervals}>
                {
                  [4, 9, 9, 9, 9, 9].map((interval, index) => (
                    <div style={{ height: 48, borderTop: '1px solid', }} key={index}>{index}</div>
                  ))

                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
