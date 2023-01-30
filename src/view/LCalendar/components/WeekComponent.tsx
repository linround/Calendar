import React, { useContext, useMemo } from 'react'
import weekStyle from './week.module.less'
import classnames from 'classnames'
import {
  BaseContext,
  CalendarContext, EventContext,
  WeeksContext
} from '../props/propsContext'
import {
  createDayList, getDayIdentifier,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek, isOutSide,
  parseTimeStamp, weekdayFormatter
} from '../utils/timesStamp'
import { CalendarDaySlotScope, CalendarTimestamp } from '../utils/calendar'
import { IWeekHeadColumn } from './type'
import { isEventOn, isEventStart } from '../utils/events'

export function WeekComponent() {
  const { start, end, parsedWeekdays, times, weekdaySkips, } = useContext(BaseContext)
  const { type, } = useContext(CalendarContext)
  const { parsedEvents, eventModeFunction, eventOverlapThreshold, } = useContext(EventContext)
  const { minWeeks, } = useContext(WeeksContext)


  const categoryMode = useMemo<boolean>(() => type === 'category', [type])
  const parsedStart = useMemo(() => getStartOfMonth(parseTimeStamp(start, true)),
    [start])
  const parsedEnd = useMemo(() => getEndOfMonth(parseTimeStamp(end, true)),
    [end])
  const mode = useMemo(() => eventModeFunction(
    parsedEvents, parsedWeekdays[0], eventOverlapThreshold
  ), [parsedEvents, parsedWeekdays, eventOverlapThreshold])

  const todayWeek = useMemo(() => {
    const today = times?.today as CalendarTimestamp
    const newStart = getStartOfWeek(
      today, parsedWeekdays, today
    )
    const newEnd = getEndOfWeek(
      today, parsedWeekdays, today
    )
    return createDayList(
      newStart,
      newEnd,
      today,
      weekdaySkips,
      parsedWeekdays.length,
      parsedWeekdays.length
    )
  }, [times, parsedWeekdays, weekdaySkips])


  function WeekHeadColumn(props: React.PropsWithChildren<IWeekHeadColumn>) {
    const { day, } = props
    const outSide = isOutSide(
      day, parsedStart, parsedEnd
    )
    const weekText = weekdayFormatter(day)
    const className = classnames({
      [weekStyle.isPresent]: day.present,
      [weekStyle.isPast]: day.past,
      [weekStyle.isFuture]: day.future,
      [weekStyle.isOutside]: outSide,
    })
    return (
      <div className={className}>
        {weekText}
      </div>
    )
  }


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



  function GenWeeks() {
    const weekDays = parsedWeekdays.length
    const weeks:CalendarTimestamp[][] = []
    for (let i = 0; i < days.length;i += weekDays) {
      const week = days.slice(i, i + weekDays)
      weeks.push(week)
    }
    return (
      <>
        {weeks.map((week, index) => (
          <div key={index} className={weekStyle.weekDays}>
            {
              week.map(GenDay)
            }
          </div>

        ))}
      </>
    )
  }

  function GenDay(
    day:CalendarTimestamp, index:number, week:CalendarTimestamp[]
  ) {
    const outside = isOutSide(
      day, parsedStart, parsedEnd
    )
    const className = classnames({
      [weekStyle.isDayOutSide]: outside,
      [weekStyle.weekDaysCell]: true,
    })
    const daySlotScope: CalendarDaySlotScope = {
      ...day,
      index,
      week,
      outside,
    }
    /***
     * 过滤出当日的日历事件
     */
    const identifier = getDayIdentifier(daySlotScope)
    const firstWeekday =  parsedWeekdays[0]
    const events = parsedEvents.filter((event) => isEventStart(
      event, daySlotScope, identifier, firstWeekday
    ))

    const visuals = mode(
      daySlotScope, events, false, categoryMode
    )
    if (visuals.length) {

      console.log(visuals)
    }
    return (
      <div key={day.date} className={className}>
        <div className={weekStyle.weekDaysCellLabel}>
          {day.day}
        </div>
      </div>
    )
  }
  return (
    <>
      <div className={weekStyle.weekHead}>
        {
          todayWeek.map((day, index) => (
            <div className={weekStyle.weekHeadColumn} key={day.date}>
              <WeekHeadColumn day={day} index={index}  />
            </div>
          ))
        }
      </div>
      <GenWeeks />
    </>
  )
}





