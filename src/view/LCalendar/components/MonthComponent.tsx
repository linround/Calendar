import {
  IMonth,
  IMonthEvents,
  IMonthSegments
} from './type'
import React, {
  useRef,
  useMemo,
  useEffect,
  useContext
} from 'react'
import {
  BaseContext,
  EventContext,
  MouseEventContext,
  WeeksContext
} from '../props/propsContext'
import {
  createDayList,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  parseTimeStamp,
  timestampToDate
} from '../utils/timesStamp'
import {
  sortEvents,
  eventLevels,
  eventSegments,
  eventsForWeek,
  isSegmentInSlot
} from '../utils/segments/eventSegments'
import moment from 'moment'
import { IMonthProps } from './dayPropsType'
import monthStyle from './month.module.less'
import { WeekComponent } from './WeekComponent'
import localizer from '../utils/segments/localizer'
import { CalendarTimestamp } from '../utils/calendar'
import { accessors } from '../utils/segments/accessors'
import { CommonMonthHeader } from './CommonMonthHeader'





export const MonthComponent = React.forwardRef((props:React.PropsWithChildren<IMonthProps>, ref) => {

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
    // 这里将创建日历部分提取到最上层
    const normalSegments = segments.filter((segment) => !segment.event.isCreate && !segment.event.isDragging)
    const createSegments = segments.filter((segment) => segment.event.isCreate || segment.event.isDragging)
    const { levels, extra, } = eventLevels([...createSegments, ...normalSegments], Math.max(maxRows - 1, 1))

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

  // 存储该scroll滚动容器
  const containerRef = useRef<HTMLDivElement|null>(null)
  const { setDayScrollRef, } = useContext(MouseEventContext)
  useEffect(() => {
    if (containerRef) {
      setDayScrollRef(containerRef.current)
    }
  }, [containerRef])

  return (
    <div
      ref={containerRef}
      className={monthStyle.monthBodyContainer}>
      <CommonMonthHeader
        parsedEnd={parsedEnd}
        todayWeek={todayWeek}
        parsedStart={parsedStart} />
      {
        month.map((weekDays, index) => (
          <WeekComponent
            ref={ref}
            {...props}
            key={index}
            weekDays={weekDays}
            weekSegments={monthSegments[index]}/>
        ))
      }
    </div>
  )
})
