import React, {
  useContext, useEffect, useMemo, useRef
} from 'react'
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
  parseTimeStamp, weekdayFormatter, WIDTH_FULL, WIDTH_START
} from '../utils/timesStamp'
import { CalendarDaySlotScope, CalendarTimestamp } from '../utils/calendar'
import { IWeekHeadColumn } from './type'
import {  isEventStart } from '../utils/events'
import { CalendarEventVisual, IMonthEventStyle } from '../utils/modes/common'
const MORE_ELEMENT = 'more-element'
const PLACEHOLDER_ELEMENT = 'placeholder-element'
const EVENT_ELEMENT = 'event-element'


export function WeekComponent() {
  const { start, end, parsedWeekdays, times, weekdaySkips, } = useContext(BaseContext)
  const { type, } = useContext(CalendarContext)
  const { parsedEvents, eventModeFunction,
    eventMarginBottom,
    eventHeight, eventOverlapThreshold, } = useContext(EventContext)
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
    const dayIdentifier = getDayIdentifier(daySlotScope)
    const firstWeekday =  parsedWeekdays[0]
    const events = parsedEvents.filter((event) => isEventStart(
      event, daySlotScope, dayIdentifier, firstWeekday
    ))

    const visuals:CalendarEventVisual[] = mode(
      daySlotScope, events, false, categoryMode
    )

    // 生成该日的占位符
    const placeholders:(Partial<IMonthEventStyle>)[] = []
    visuals.forEach((visual) => {
      while (placeholders.length < visual.column) {
        placeholders.push({
          placeholder: true,
        })
      }
      const { event, } = visual
      const week = daySlotScope.week
      const start = dayIdentifier === event.startIdentifier
      let end = dayIdentifier === event.endIdentifier
      let width = WIDTH_START
      if (!categoryMode) {
        for (let i = daySlotScope.index + 1;i < week.length;i++) {
          const weekdayIdentifier = getDayIdentifier(week[i])
          if (event.endIdentifier >= weekdayIdentifier) {
            width += WIDTH_FULL
            end = end || weekdayIdentifier === event.endIdentifier
          } else {
            end = true
            break
          }
        }
      }
      const scope = {
        event,
        day: daySlotScope,
        start,
        end,
        placeholder: false,
        timed: false,
        style: {
          height: eventHeight,
          width,
          marginBottom: eventMarginBottom,
        },
      }
      placeholders.push(scope)
    })
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (ref.current) {
        const parent = ref.current
        const more:HTMLDivElement = parent.querySelector(`.${MORE_ELEMENT}`)
        if (!more) {
          return
        }
        const events:HTMLDivElement[] = [...(parent.querySelectorAll(`.${EVENT_ELEMENT}`) || [])]

        const parentBounds = parent?.getBoundingClientRect()

        const last = events.length - 1
        const eventsSorted = events.map((event) => ({
          event,
          bottom: event.getBoundingClientRect().bottom,
        }))
          .sort((a, b) => a.bottom - b.bottom)
        let hidden = 0
        for (let i = 0;i <= last;i++) {
          const bottom = eventsSorted[i].bottom
          const hide = i === last ?
            (bottom > parentBounds.bottom) :
            ((bottom + eventHeight) > parentBounds.bottom)
          if (hide) {
            eventsSorted[i].event.style.display = 'none'
            hidden += 1
          }
        }
        if (hidden) {
          more.style.display = ''
        } else {
          more.style.display = 'none'
        }
      }
    }, [ref])
    return (
      <div key={day.date} className={className} ref={ref} >
        <div className={weekStyle.weekDaysCellLabel}>
          {day.day}
        </div>
        {
          placeholders.map((placeholder, index) => (
            placeholder.placeholder ?
              (<div
                className={PLACEHOLDER_ELEMENT}
                key={index}
                style={{ height: (eventHeight + eventMarginBottom), }} />) :
              (<div
                className={EVENT_ELEMENT}
                key={index}
                style={{
                  position: 'relative',
                  width: `${placeholder.style?.width}%`,
                  height: `${placeholder.style?.height}px`,
                  marginBottom: `${ placeholder.style?.marginBottom}px`,
                  background: placeholder.event?.input.color,
                }}
              >
                {
                  placeholder.event?.input.name
                }
              </div>)
          ))
        }
        {
          (placeholders.length > 0) ?
            <div
              className={MORE_ELEMENT}
              style={{
                height: `${eventHeight}px`,
                display: 'none',
                marginBottom: `${eventMarginBottom}px`,
              }}
            >more</div> :
            ''
        }

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





