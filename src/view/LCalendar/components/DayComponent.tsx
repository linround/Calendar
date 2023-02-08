import dayStyle from './day.module.less'
import { IDayProps } from './dayPropsType'
import { Button } from 'antd'
import {
  copyTimestamp,
  createIntervalList,
  getDayIdentifier,
  getTimestampLabel,
  MINUTES_IN_DAY,
  parseTime,
  updateMinutes,
  VTime
} from '../utils/timesStamp'
import {
  genTimedEvents, IEventsRect, isEventOn, stopDefaultEvent
} from '../utils/events'
import React, {
  useCallback, useContext, useMemo
} from 'react'
import {
  CalendarDayBodySlotScope,
  CalendarDaySlotScope,
  CalendarEventParsed,
  CalendarTimestamp, IMouseEvent, IMouseTime
} from '../utils/calendar'
import {
  BaseContext, CalendarContext, IntervalsContext, EventContext
} from '../props/propsContext'
import { CalendarEventVisual } from '../utils/modes/common'
import {
  IS_EVENT, mouseDayTime, mouseEvent
} from './type'
import classnames from 'classnames'

export default function (props: IDayProps) {
  const {
    firstTime,
    onClickEvent = mouseEvent<IMouseEvent>(),
    onMousedownEvent = mouseEvent<IMouseEvent>(),
    onMouseupEvent = mouseEvent<IMouseEvent>(),


    onTimeContainerClick = mouseDayTime<IMouseTime>(),
    onTimeContainerMouseup = mouseDayTime<IMouseTime>(),
    onTimeContainerMousemove = mouseDayTime<IMouseTime>(),
    onTimeContainerMousedown = mouseDayTime<IMouseTime>(),
  } = props
  const {
    parsedEvents,
    eventOverlapThreshold, eventModeFunction,
  } = useContext(EventContext)
  const {
    times,
    days = [],
    parsedWeekdays,
  } = useContext(BaseContext)
  const { type, } = useContext(CalendarContext)
  const {
    firstInterval,
    intervalHeight,
    intervalCount,
    intervalWidth,
    intervalMinutes,
  } = useContext(IntervalsContext)


  const categoryMode = useMemo<boolean>(() => type === 'category', [type])
  const parsedEventOverlapThreshold = useMemo<number>(() => eventOverlapThreshold, [eventOverlapThreshold])
  const parsedIntervalHeight: number = useMemo(() => intervalHeight, [intervalHeight])
  const parsedFirstTime: number | false = useMemo(() => parseTime(firstTime), [firstTime])
  const parsedFirstInterval: number = useMemo(() => (firstInterval), [firstInterval])
  const parsedIntervalMinutes: number = useMemo<number>(() => (intervalMinutes), [intervalMinutes])
  const parsedIntervalCount: number = useMemo(() => intervalCount, [intervalCount])
  const bodyHeight: number = useMemo(() => parsedIntervalCount * parsedIntervalHeight, [parsedIntervalCount * parsedIntervalHeight])
  const firstMinute: number = useMemo(() => {
    const time = parsedFirstTime
    return time !== false && time >= 0 && time < MINUTES_IN_DAY ?
      time :
      parsedFirstInterval * parsedIntervalMinutes
  }, [parsedFirstTime, parsedIntervalMinutes, parsedFirstInterval])
  const now = times?.now || null
  const intervals: CalendarTimestamp[][] = useMemo<CalendarTimestamp[][]>(() => days.map((d) => createIntervalList(
    d, firstMinute, parsedIntervalMinutes, parsedIntervalCount, now as CalendarTimestamp
  )), [days, firstMinute, parsedIntervalMinutes, parsedIntervalCount, now])


  const getTimestampAtEvent = useCallback((e: React.MouseEvent, day: CalendarTimestamp): CalendarTimestamp => {
    const timestamp = copyTimestamp(day)
    const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const baseMinutes = firstMinute
    // 求得事件相对于视口的位置
    const clientY = e.clientY
    // 点击事件的位置 减去 容器元素顶部的位置 得到事件发生处与元素顶部的位置
    // 除以每个格子的高度，从而获得移动了多少个格子
    const addIntervals: number = (clientY - bounds.top) / parsedIntervalHeight
    // 每个格子代表的分钟数 乘以 移动的格子的数量  得到移动的分钟数
    const addMinutes: number = Math.floor(addIntervals * parsedIntervalMinutes)
    // 顶部代表的分钟数 加上 移动的分钟数  得到当前事件的分钟数
    const minutes: number = baseMinutes + addMinutes
    return updateMinutes(
      timestamp, minutes, now as CalendarTimestamp
    )
  }, [parsedIntervalHeight, parsedIntervalMinutes, firstMinute])

  const timeDelta = (time: VTime): number | false => {
    const minutes = parseTime(time)
    if (minutes === false) {
      return false
    }
    const min: number = firstMinute
    const gap: number = parsedIntervalCount * parsedIntervalMinutes
    // 求出该时间点的所在位置
    return (minutes - min) / gap
  }
  const timeToY = (time: VTime, clamp = true) => {
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
  const minutesToPixels = (minutes: number): number => (minutes / parsedIntervalMinutes) * parsedIntervalHeight
  const getSlotScope = (timestamp: CalendarTimestamp): CalendarDayBodySlotScope => {
    const scope = copyTimestamp(timestamp) as any
    // 该方法可求得该时间点的所在高度的值
    scope.timeToY = timeToY
    scope.timeDelta = timeDelta
    // 根据分钟数
    scope.minutesToPixels = minutesToPixels
    scope.week = days
    return scope
  }


  const onTimeContainer = (nativeEvent: React.MouseEvent, day: CalendarTimestamp): IMouseTime => {
    // 获取到鼠标hover处的时间值
    const time: CalendarTimestamp = getTimestampAtEvent(nativeEvent, day)
    return {
      ...time,
      nativeEvent,
    }
  }

  // 根据传入的日期，在所有的日历事件中过滤出该日的事件
  const getEventsForDayTimed = (day: CalendarDaySlotScope): CalendarEventParsed[] => {
    const identifier = getDayIdentifier(day)
    return parsedEvents.filter((event) => !event.allDay &&
      isEventOn(event, identifier))
  }

  function dayBodySlot(day: CalendarDayBodySlotScope) {
    const mode = eventModeFunction(
      parsedEvents,
      parsedWeekdays[0],
      parsedEventOverlapThreshold
    )
    const events = getEventsForDayTimed(day)
    const visuals = mode(
      day, events, true, categoryMode
    )
    const visualsRect = visuals.map((visual: CalendarEventVisual) => genTimedEvents(visual,
      day))
      .filter((i: any) => i !== false) as IEventsRect[]
    const className = classnames({
      [dayStyle.dayBodyTimedItem]: true,
      [IS_EVENT]: true,
    })
    return (
      <>
        {
          visualsRect
            .map((rect, index) => (
              <div
                key={rect.event.name}
                className={className}
                onClick={(nativeEvent) => onClickEvent({
                  nativeEvent,
                  event: rect.event,
                })}
                onMouseDown={(nativeEvent) => {
                  if (nativeEvent.button === 0) {
                    onMousedownEvent({
                      nativeEvent,
                      event: rect.event,
                    })
                  }
                }}
                onMouseUp={(nativeEvent) => {
                  if (nativeEvent.button === 0) {
                    onMouseupEvent({
                      nativeEvent,
                      event: rect.event,
                    })
                  }
                }}
                style={{ ...rect.style, } }>
                <div>
                  {rect.content.title}
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
                  shape='circle'>
                  {day.date}</Button>
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
                    onClick={(e) => {
                      onTimeContainerClick(onTimeContainer(e, day))
                    }}
                    onMouseDown={(e) => {
                      // 确保是左键按下
                      if (e.button === 0) {
                        onTimeContainerMousedown(onTimeContainer(e, day))
                      }
                    }}
                    onMouseMove={(e) => {
                      onTimeContainerMousemove(onTimeContainer(e, day))
                    }}
                    onMouseUp={(e) => {
                      onTimeContainerMouseup(onTimeContainer(e, day))
                    }}>
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
