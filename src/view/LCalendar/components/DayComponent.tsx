import { V3DayHeaderComponent } from '../v3/components/day/DayHeader'
import { V3DayIntervals } from '../v3/components/day/DayIntervals'
import { V3DayColumnComponent } from '../v3/components/day/DayColumn'
import dayStyle from './day.module.less'
import { IDayProps } from './dayPropsType'
import {
  copyTimestamp, createIntervalList, MINUTES_IN_DAY, parseTime, VTime
} from '../utils/timesStamp'
import React, {
  useContext, useEffect, useMemo, useRef
} from 'react'
import { CalendarDayBodySlotScope, CalendarTimestamp } from '../utils/calendar'
import {
  BaseContext, IntervalsContext, MouseEventContext
} from '../props/propsContext'
import classnames from 'classnames'
import { useClassifiedEventsHook } from '../props/useEventsHook'

export default function (props: IDayProps)  {
  const {
    firstTime,
  } = props
  const {
    times,
    days = [],
  } = useContext(BaseContext)
  const {
    firstInterval,
    intervalHeight,
    intervalCount,
    intervalWidth,
    intervalMinutes,
  } = useContext(IntervalsContext)

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



  const { classifiedEvents, } = useClassifiedEventsHook()

  // 此处分类已经创建的事件
  return (
    <div className={dayStyle.dayContainer}>

      <V3DayHeaderComponent
        days={days}
        intervalWidth={intervalWidth}
        events={[
          ...classifiedEvents.allDayEvents
        ]}
      />

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
              events={[
                ...classifiedEvents.crossDaysEvents,
                ...classifiedEvents.normalEvents
              ]}
              getSlotScope={getSlotScope}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
