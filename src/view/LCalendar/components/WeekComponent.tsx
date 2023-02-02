import React, {
  useContext, useEffect, useMemo, useRef
} from 'react'
import {
  eventLevels,
  eventSegments, eventsForWeek, sortEvents
} from '../utils/segments/eventSegments'
import { accessors } from '../utils/segments/accessors'
import localizer from '../utils/segments/localizer'
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
  parseTimeStamp, timestampToDate, weekdayFormatter, WIDTH_FULL, WIDTH_START
} from '../utils/timesStamp'
import { CalendarDaySlotScope, CalendarTimestamp } from '../utils/calendar'
import { IWeekHeadColumn } from './type'
import {  isEventStart } from '../utils/events'
import { CalendarEventVisual, IMonthEventStyle } from '../utils/modes/common'
import moment from 'moment'
const MORE_ELEMENT = 'more-element'
const PLACEHOLDER_ELEMENT = 'placeholder-element'
const EVENT_ELEMENT = 'event-element'



export function WeekComponent() {
  const { start, end, parsedWeekdays, times, weekdaySkips, } = useContext(BaseContext)
  const { type, } = useContext(CalendarContext)
  const { parsedEvents, eventModeFunction,
    eventMarginBottom,
    eventHeight, eventOverlapThreshold, events, } = useContext(EventContext)
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
    const weeks:number[][] = []
    for (let i = 0; i < days.length;i += weekDays) {
      const week = days.slice(i, i + weekDays)
      weeks.push(week.map((day) => moment(timestampToDate(day))
        .startOf('day')
        .valueOf()))
    }
    // 获取本周的事件
    const weeksEvents = weeks.map((week) => {
      const weekEvents = eventsForWeek(
        [...events],
        week[0],
        week[week.length - 1],
        accessors,
        localizer
      )
      return weekEvents.sort((a, b) => sortEvents(
        a, b, accessors, localizer
      ))
    })

    weeksEvents.map((weekEvents, index) => {
      const segments = weekEvents.map((event) => eventSegments(
        event, weeks[index], accessors, localizer
      ))
      // 还需要处理maxRows和minRows的来源
      const maxRows = 3
      const minRows = 0
      const { levels, extra, } = eventLevels(segments, Math.max(maxRows - 1, 1))
      while (levels.length < minRows) {
        levels.push([])
      }
      return {
        levels,
        extra,
        range: weeks[index],
      }
    })
    // 对每周的事件进行视图处理
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

  function GenDay(day:number, index:number) {
    return (
      <div className={weekStyle.weekDaysCell} key={day.valueOf()}>
        {day}
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





