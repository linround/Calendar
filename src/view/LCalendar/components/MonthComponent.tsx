import { WeekComponent } from './WeekComponent'
import monthStyle from './month.module.less'
import React, { useContext, useMemo } from 'react'
import {
  BaseContext, EventContext, WeeksContext
} from '../props/propsContext'
import {
  createDayList,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek, isOutSide,
  parseTimeStamp, timestampToDate, weekdayFormatter
} from '../utils/timesStamp'
import { CalendarTimestamp } from '../utils/calendar'
import moment from 'moment'
import {
  eventLevels, eventSegments, eventsForWeek, isSegmentInSlot, sortEvents
} from '../utils/segments/eventSegments'
import { accessors } from '../utils/segments/accessors'
import localizer from '../utils/segments/localizer'
import {
  IMonth, IMonthEvents, IMonthSegments, IWeekHeadColumn
} from './type'
import weekStyle from './week.module.less'
import classnames from 'classnames'
import { IMonthProps } from './dayPropsType'





export function MonthComponent(props:React.PropsWithChildren<IMonthProps>) {

  // 还需要处理maxRows和minRows的来源
  const maxRows = 3
  const minRows = 0

  const { start, end, parsedWeekdays, times, weekdaySkips, } = useContext(BaseContext)
  const {  events, } = useContext(EventContext)
  const { minWeeks, } = useContext(WeeksContext)

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
  // 获取本月的事件
  const monthEvents:IMonthEvents = month.map((week) => {
    const weekEvents = eventsForWeek(
      [...events],
      week[0].value,
      week[week.length - 1].value,
      accessors,
      localizer
    )
    return weekEvents.sort((a, b) => sortEvents(
      a, b, accessors, localizer
    ))
  })
  // 这个月的事件分布
  const monthSegments:IMonthSegments = monthEvents.map((weekEvents, index) => {
    // 某个周的事件分布
    const segments = weekEvents.map((event) => eventSegments(
      event, month[index].map((w) => w.value), accessors, localizer
    ))


    const { levels, extra, } = eventLevels(segments, Math.max(maxRows - 1, 1))
    while (levels.length < minRows) {
      levels.push([])
    }
    return {
      levels,
      extra,
      range: month[index],
      slots: month[index].length,
      getEventsForSlot(slot:number) {
        return segments
          .filter((seg) => isSegmentInSlot(seg, slot))
          .map((seg) => seg.event)
      },
    }
  })
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
  return (
    <div className={monthStyle.monthBodyContainer}>
      <div className={monthStyle.monthHeader}>
        {
          todayWeek.map((day, index) => (
            <div  key={day.date} className={monthStyle.monthHeaderColumn}>
              <WeekHeadColumn day={day} index={index}  />
            </div>
          ))
        }
      </div>
      {
        month.map((weekDays, index) => <WeekComponent
          {...props}
          weekDays={weekDays}
          weekSegments={monthSegments[index]}
          key={index} />)
      }
    </div>
  )
}
