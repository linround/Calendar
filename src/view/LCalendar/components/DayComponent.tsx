import { DayBodySlot } from './DayBodySlot'
import { V3DayHeaderComponent } from '../v3/components/day/DayHeader'
import { V3DayIntervals } from '../v3/components/day/DayIntervals'
import { V3DayColumnComponent } from '../v3/components/day/DayColumn'
import {
  mouseEvent,
  mouseDayTime
} from './type'
import Button from '@mui/material/Button'
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
  VTime, weekdayFormatter
} from '../utils/timesStamp'
import { isEventOn } from '../utils/events'
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
  } = useContext(EventContext)
  const {
    times,
    days = [],
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

  // 存储该scroll滚动容器
  const dayScrollRef = useRef<HTMLDivElement|null>(null)
  const { setDayScrollRef, } = useContext(MouseEventContext)
  useEffect(() => {
    if (dayScrollRef) {
      setDayScrollRef(dayScrollRef.current)
    }
  }, [dayScrollRef])


  const scrollContainerClass = classnames({
    [dayStyle.dayBodyScrollArea]: true,
    [dayStyle.scrollContainer]: true,
  })
  return (
    <div className={dayStyle.dayContainer}>
      <V3DayHeaderComponent days={days} intervalWidth={intervalWidth} />
      <div className={dayStyle.dayBody}>
        <div
          ref={dayScrollRef}
          className={scrollContainerClass}>
          <div
            className={dayStyle.dayBodyPane}
            style={{ height: intervalHeight * intervalCount, }}>

            {/*左边时间值*/}
            <V3DayIntervals
              intervals={intervals}
              intervalWidth={intervalWidth}
              intervalHeight={intervalHeight} />

            <V3DayColumnComponent
              firstMinute={firstMinute}
              scrollContainer={dayScrollRef.current as HTMLDivElement}
              intervals={intervals}
              intervalWidth={intervalWidth}
              intervalHeight={intervalHeight}
              days={days}
              events={parsedEvents}
              getSlotScope={getSlotScope}
            />
            <div className={dayStyle.dayBodyDayContainer} >
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
                      intervals[0].map((interval, index) => (
                        <div
                          className={dayStyle.dayBodyDayInterval}
                          style={{ height: intervalHeight, }}
                          key={index} />
                      ))
                    }
                    <div
                      className={dayStyle.dayBodyTimedContainer}>
                      <DayBodySlot
                        ref={ref}
                        day={getSlotScope(day)}
                        categoryMode={categoryMode}
                        getEventsForDayTimed={getEventsForDayTimed}
                        onClickEvent={onClickEvent}
                        onMousedownEvent={onMousedownEvent}
                        onMouseupEvent={onMouseupEvent}
                      />
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
