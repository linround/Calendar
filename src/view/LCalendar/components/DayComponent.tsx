
import {
  IS_EVENT,
  mouseEvent,
  mouseDayTime
} from './type'
import { Button } from 'antd'
import dayStyle from './day.module.less'
import { IDayProps } from './dayPropsType'
import {
  parseTime,
  updateMinutes,
  copyTimestamp,
  MINUTES_IN_DAY,
  getDayIdentifier,
  getTimestampLabel,
  createIntervalList,
  VTime
} from '../utils/timesStamp'
import {
  isEventOn,
  IEventsRect,
  genTimedEvents
} from '../utils/events'
import React, {
  useRef,
  useMemo,
  useEffect,
  useContext,
  useCallback
} from 'react'
import {
  IMouseTime,
  IMouseEvent,
  CalendarTimestamp,
  CalendarEventParsed,
  CalendarDaySlotScope,
  CalendarDayBodySlotScope
} from '../utils/calendar'
import {
  BaseContext,
  EventContext,
  CalendarContext,
  IntervalsContext,
  MouseEventContext
} from '../props/propsContext'
import classnames from 'classnames'
import { WEEK_DAYS_TEXT } from '../utils/time'
import { RenderEvent } from './DayEventMixin'
import { CalendarEventVisual } from '../utils/modes/common'

export default React.forwardRef((props: IDayProps, ref) =>  {
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




    // 过露出来新建的事件
    const draggingEventIndex = events.findIndex((e) => e.input.isDragging)
    let normalEvents:CalendarEventParsed[] = []
    let draggingEvent:CalendarEventParsed[] = []
    let draggingEventRect:IEventsRect = {
      event: {},
      style: {
        top: '0',
        height: '0',
        left: '0',
        width: '0',
        backgroundColor: '',
      },
      content: {
        title: '',
        timeRange: '',
      },
    }
    if (draggingEventIndex > -1) {
      draggingEvent = events.splice(draggingEventIndex, 1)
      const draggingEventVisual = { event: draggingEvent[0], left: 0, width: 100, }
      draggingEventRect = genTimedEvents(draggingEventVisual as CalendarEventVisual, day) as IEventsRect
    }
    normalEvents = events








    const visuals = mode(
      day, normalEvents, true, categoryMode
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
        {/*在边界事件中比如00:00这个时间点，可以当作某天的节苏或另一天的开始,
           在这个时间点虽然有事件，但不会形成图像createEventRect
        */}
        {draggingEvent.length > 0 && draggingEventRect && (
          <RenderEvent
            rect={draggingEventRect}
            className={className}
            onClickEvent={onClickEvent}
            onMousedownEvent={onMousedownEvent}
            onMouseupEvent={onMouseupEvent}
            ref={ref}
          />
        )}
        {
          visualsRect
            .map((rect, index) => (
              <RenderEvent
                key={`${index}${rect.event.id}`}
                rect={rect}
                className={className}
                onClickEvent={onClickEvent}
                onMousedownEvent={onMousedownEvent}
                onMouseupEvent={onMouseupEvent}
                ref={ref}
              />
            ))
        }
      </>
    )
  }

  // 存储该scroll滚动容器
  const dayScrollRef = useRef<HTMLDivElement|null>(null)
  const { setDayScrollRef, } = useContext(MouseEventContext)
  useEffect(() => {
    if (dayScrollRef) {
      setDayScrollRef(dayScrollRef.current)
    }
  }, [dayScrollRef])
  return (
    <div className={dayStyle.dayContainer}>
      <div className={dayStyle.dayHeader} style={{ marginRight: 17, }}>
        <div className={dayStyle.dayHeaderIntervals} style={{ width: intervalWidth, }}></div>
        {days.map((day) => (
          <div className={dayStyle.dayHeaderDay} key={day.date} >
            <div>
              周{WEEK_DAYS_TEXT[day.weekday]}
            </div>
            <div>
              <Button
                type='primary'
                shape='circle'>
                {day.day}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className={dayStyle.dayBody}>
        <div
          ref={dayScrollRef}
          className={dayStyle.dayBodyScrollArea}>
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
})
