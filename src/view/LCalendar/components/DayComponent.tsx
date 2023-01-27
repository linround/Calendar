import dayStyle from './day.module.less'
import { IDayProps } from './dayPropsType'
import { CalendarEventOverlapModes } from '../utils/modes'
import { Button } from 'antd'
import {
  copyTimestamp,
  createDayList,
  createIntervalList,
  getDayIdentifier,
  getTimestampLabel,
  getWeekdaySkips,
  MINUTES_IN_DAY,
  parseTime,
  parseTimeStamp,
  updateMinutes,
  VTime
} from '../utils/timesStamp'
import {
  genTimedEvents, IEventsRect, isEventOn, parseEvent, stopDefaultEvent
} from '../utils/events'
import React, { useMemo } from 'react'
import {
  CalendarDayBodySlotScope,
  CalendarDaySlotScope,
  CalendarEventOverlapMode,
  CalendarEventParsed,
  CalendarTimestamp, IMouseEvent, IMouseTime
} from '../utils/calendar'

export default function (props: Partial<IDayProps>) {
  const {
    type = 'day',
    intervalWidth = 60,
    times = null,
    parsedStart = parseTimeStamp(new Date(), true),
    parsedEnd = parseTimeStamp(new Date(), true),
    maxDays = 7,
    weekdays = [0, 1, 2, 3, 4, 5, 6],
    firstTime,
    firstInterval = 0,
    intervalMinutes = 60,
    intervalCount = 24,
    intervalHeight = 48,
    events = [],
    eventStart = 'start',
    eventEnd = 'end',
    eventTimed = 'timed',
    eventOverlapMode = 'stack',
    eventOverlapThreshold = 60,
    onMousedownEvent = (event:IMouseEvent) => undefined,
    onContextMenuEvent = (time:IMouseEvent) => undefined,
    onTimeHeaderClick = (e, event) => event,
    onTimeContainerMouseup = (time:IMouseTime) => undefined,
    onTimeContainerMousemove = (time:IMouseTime) => undefined,
    onTimeContainerMousedown = (time:IMouseTime) => undefined,
  } = props

  // 可选的堆叠模式和列模式
  const eventModeFunction = useMemo<CalendarEventOverlapMode>(() => CalendarEventOverlapModes[eventOverlapMode], [eventOverlapMode])






  const parsedWeekdays = useMemo<number[]>(() => (Array.isArray(weekdays) ? weekdays :
    (weekdays || '').split(',')
      .map((x) => parseInt(x, 10))), [weekdays])
  const weekdaySkips = useMemo<number[]>(() => getWeekdaySkips(parsedWeekdays), [parsedWeekdays])

  const today = times?.today || null
  const days: CalendarTimestamp[] = useMemo<CalendarTimestamp[]>(() => createDayList(
    parsedStart as CalendarTimestamp,
    parsedEnd as CalendarTimestamp,
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
  const parsedEvents:CalendarEventParsed[] = useMemo(() => events.map((input, index) => parseEvent(
    input,
    index,
    eventStart,
    eventEnd,
    (!!input[eventTimed]),
    false
  )), [events, eventStart, eventEnd])
  const categoryMode = useMemo<boolean>(() => type === 'category', [type])
  const parsedEventOverlapThreshold = useMemo<number>(() => parseInt(eventOverlapThreshold as string, 10), [eventOverlapThreshold])
  const parsedIntervalHeight: number = useMemo(() => intervalHeight, [intervalHeight])
  const parsedFirstTime:number|false = useMemo(() => parseTime(firstTime), [firstTime])
  const parsedFirstInterval:number = useMemo(() => parseInt(firstInterval as string, 10), [firstInterval])
  const parsedIntervalMinutes:number = useMemo(() => parseInt(intervalMinutes as string, 10), [intervalMinutes])
  const parsedIntervalCount:number = useMemo(() => intervalCount, [intervalCount])
  const bodyHeight:number = useMemo(() => parsedIntervalCount * parsedIntervalHeight, [parsedIntervalCount * parsedIntervalHeight])
  const firstMinute:number = useMemo(() => {
    const time = parsedFirstTime
    return time !== false && time >= 0 && time < MINUTES_IN_DAY ?
      time :
      parsedFirstInterval * parsedIntervalMinutes
  }, [parsedFirstTime, parsedIntervalMinutes, parsedFirstInterval])
  const now = times?.now || null
  const intervals:CalendarTimestamp[][] = useMemo<CalendarTimestamp[][]>(() => days.map((d) => createIntervalList(
    d, firstMinute, parsedIntervalMinutes, parsedIntervalCount, now as CalendarTimestamp
  )), [days, firstMinute, parsedIntervalMinutes, parsedIntervalCount, now])

  const eventWeekdays = useMemo(() => parsedWeekdays, [parsedWeekdays])



  const getTimestampAtEvent = (e:React.MouseEvent, day:CalendarTimestamp):CalendarTimestamp => {
    const timestamp = copyTimestamp(day)
    const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const baseMinutes = firstMinute
    // 求得事件相对于视口的位置
    const clientY = e .clientY
    // 点击事件的位置 减去 容器元素顶部的位置 得到事件发生处与元素顶部的位置
    // 除以每个格子的高度，从而获得移动了多少个格子
    const addIntervals:number = (clientY - bounds.top) / parsedIntervalHeight
    // 每个格子代表的分钟数 乘以 移动的格子的数量  得到移动的分钟数
    const addMinutes:number = Math.floor(addIntervals * parsedIntervalMinutes)
    // 顶部代表的分钟数 加上 移动的分钟数  得到当前事件的分钟数
    const minutes: number = baseMinutes + addMinutes
    return updateMinutes(
      timestamp, minutes, now as CalendarTimestamp
    )
  }

  const timeDelta = (time:VTime): number|false => {
    const minutes = parseTime(time)
    if (minutes === false) {
      return false
    }
    const min:number = firstMinute
    const gap:number = parsedIntervalCount * parsedIntervalMinutes
    // 求出该时间点的所在位置
    return (minutes - min) / gap
  }
  const timeToY = (time:VTime, clamp = true) => {
    // 求出该时间的y轴百分比
    let y = timeDelta(time)
    if (y !== false) {
      y *= bodyHeight
      if (clamp) {
        if (y < 0) {
          y = 0
        }
        if (y > bodyHeight) {
          y = bodyHeight
        }
      }
    }
    return y
  }
  const minutesToPixels = (minutes:number):number => (minutes / parsedIntervalMinutes) * parsedIntervalHeight
  const getSlotScope = (timestamp:CalendarTimestamp):CalendarDayBodySlotScope => {
    const scope = copyTimestamp(timestamp) as any
    // 该方法可求得该时间点的所在高度的值
    scope.timeToY = timeToY
    scope.timeDelta = timeDelta
    // 根据分钟数
    scope.minutesToPixels = minutesToPixels
    scope.week = days
    return scope
  }


  const onTimeContainer = (nativeEvent:React.MouseEvent, day:CalendarTimestamp):IMouseTime => {
    // 获取到鼠标hover处的时间值
    const time:CalendarTimestamp = getTimestampAtEvent(nativeEvent, day)
    return {
      ...(getSlotScope(time) as CalendarDayBodySlotScope),
      nativeEvent,
    }
  }

  // 根据传入的日期，在所有的日历事件中过滤出该日的事件
  const getEventsForDayTimed = (day:CalendarDaySlotScope):CalendarEventParsed[] => {
    const identifier = getDayIdentifier(day)
    return parsedEvents.filter((event) => !event.allDay &&
    isEventOn(event, identifier))
  }






  function dayBodySlot(day:CalendarDayBodySlotScope) {
    const mode = eventModeFunction(
      parsedEvents,
      eventWeekdays[0],
      parsedEventOverlapThreshold
    )
    const events = getEventsForDayTimed(day)
    const visuals = mode(
      day, events, true, categoryMode
    )
    const visualsRect = visuals.map((visual) => genTimedEvents(visual,
      day))
      .filter((i) => i !== false) as IEventsRect[]
    return (
      <>
        {
          visualsRect
            .map((rect, index) => (
              <div
                key={index}
                className={dayStyle.dayBodyTimedItem}
                onContextMenu={(nativeEvent) => {
                  stopDefaultEvent(nativeEvent.nativeEvent)
                  onContextMenuEvent({
                    nativeEvent,
                    event: rect.event,
                  })
                }}
                onMouseDown={(nativeEvent) => onMousedownEvent({
                  nativeEvent,
                  event: rect.event,
                })}
                style={{ ...rect.style, } }>
                <div>
                  <strong>
                    {rect.content.title}
                  </strong>
                </div>
                <div>{rect.content.timeRange}</div>
              </div>
            ))
        }
      </>
    )
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
                  onClick={(e) => onTimeHeaderClick(e, day)}
                  shape='circle'>
                  {day.day}</Button>
              </div>
            </div>
          ))
        }
      </div>
      <div className={dayStyle.dayBody}>
        <div className={dayStyle.dayBodyScrollArea}>
          <div
            className={dayStyle.dayBodyPane}
            style={{ height: intervalHeight * intervalCount, }}>
            <div className={dayStyle.dayBodyDayContainer}>
              {/*左边时间值*/}
              <div
                className={dayStyle.dayBodyIntervalsBody}
                style={{ width: intervalWidth, }}>
                {
                  intervals[0].map((interval) => (
                    <div
                      className={dayStyle.dayBodyInterval}
                      style={{ height: intervalHeight, }}
                      key={ interval.time }>
                      <div className={dayStyle.dayBodyIntervalText}>
                        { getTimestampLabel(interval) }
                      </div>
                    </div>
                  ))
                }
              </div>
              {
                // 渲染对应的周、日视图
                days.map((day, index) => (
                  <div
                    className={dayStyle.dayBodyDay}
                    key={index}
                    onMouseDown={(e) => onTimeContainerMousedown(onTimeContainer(e, day))}
                    onMouseMove={(e) => onTimeContainerMousemove(onTimeContainer(e, day))}
                    onMouseUp={(e) => onTimeContainerMouseup(onTimeContainer(e, day))}>
                    {
                      intervals[index].map((interval) => (
                        <div
                          className={dayStyle.dayBodyDayInterval}
                          style={{ height: intervalHeight, }}
                          key={interval.time} />
                      ))
                    }
                    <div
                      className={dayStyle.dayBodyTimedContainer}>
                      {dayBodySlot(getSlotScope(day))}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
