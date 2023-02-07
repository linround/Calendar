import React, {
  useCallback,
  useContext, useEffect, useState
} from 'react'
import { MonthComponent } from '../components/MonthComponent'
import { BaseContext, EventContext } from '../props/propsContext'
import {
  CalendarEvent, IMonthMouseTime, IMouseEvent, VTimestampInput
} from '../utils/calendar'
import localizer from '../utils/segments/localizer'
import { isTruth, roundTime } from '../utils/timesStamp'
import { ISlots } from '../components/type'

export function MonthWrapper() {
  const { events, resetEvents, } = useContext(EventContext)
  const { setRef, setMoving, moving, createEvent, setCreateEvent, } = useContext(BaseContext)
  const [isMore, setIsMore] = useState<boolean>(false)
  const [dragEvent, setDragEvent] = useState<CalendarEvent | null>(null)
  const [dragTime, setDragTime] = useState<number|null>(null)
  const [mousedownTime, setMousedownTime] = useState<VTimestampInput|null>(null)
  const [mousemoveTime, setMousemoveTime] = useState<VTimestampInput|null>(null)
  const [createStart, setCreateStart] = useState<VTimestampInput| null>(null)
  const [createEnd, setCreateEnd] = useState<VTimestampInput| null>(null)

  //
  const onClickEvent = useCallback((e:IMouseEvent) => {
    const { nativeEvent, } = e
    // 这里处理下点击是 是对时间拖拽的问题
    if (moving) {
      setRef(null)
      return e
    }

    setRef(nativeEvent.currentTarget)
    return e
  }, [moving])

  const onMousedownEvent = (e:IMouseEvent) => {
    const { event, } = e
    setDragEvent(event)
    return e
  }
  const onShowMore = (arg:ISlots) => {
    const {  nativeEvent, } = arg
    setIsMore(true)
    setRef(nativeEvent.currentTarget)
  }






  const onTimeContainerMousedown = (tms:IMonthMouseTime) => {
    const { value: time, } = tms
    setMousedownTime(time)
    return tms
  }
  const onTimeContainerMousemove = useCallback((tms:IMonthMouseTime) => {
    if (!mousedownTime) return tms
    const { value: time, } = tms
    setMousemoveTime(time)
    return tms
  }, [mousedownTime])
  const onTimeContainerMouseup = (tms:IMonthMouseTime) => {
    setIsMore(false)
    setDragEvent(null)
    setDragTime(null)
    setMousedownTime(null)
    setMousemoveTime(null)
    setCreateEvent(null)
    setCreateStart(null)
    setCreateEnd(null)
    return tms
  }


  // 开始点击时的处理
  useEffect(() => {
    if (isMore) return
    if  (mousedownTime) {
      if (dragEvent) {
        const start = dragEvent.start
        const dragTime = (mousedownTime as number) - start
        setDragTime(dragTime)
      } else {
        const createStart = roundTime(mousedownTime as number)
        const createEnd = localizer.add(
          createStart, 1, 'day'
        )
        const createEvent = {
          name: `日历事件 ${events.length + 1}`,
          color: 'green',
          start: createStart,
          end: createEnd,
          timed: true,
          isCreate: true,
        }

        setCreateEvent(createEvent)
        setCreateStart(createStart)
        setCreateEnd(createEnd)
      }
    }
  }, [mousedownTime, dragEvent, isMore])


  //开始创建事件
  useEffect(() => {
    if (createEvent &&
      mousemoveTime &&
      createEnd &&
      createStart) {
      if (mousemoveTime <= createStart) {
        createEvent.start = mousemoveTime
        createEvent.end = createEnd
      } else if (mousemoveTime >= createEnd) {
        createEvent.start = createStart
        createEvent.end = localizer.add(
          mousemoveTime, 1, 'day'
        )
      }
      resetEvents(createEvent, createEvent)
    }
  }, [createEvent, mousemoveTime, createStart, createEnd])





  // 开始对日历事件拖拽平移
  useEffect(() => {
    if (dragEvent &&
      isTruth(dragTime) &&
        mousemoveTime) {
      const { start, end, } = dragEvent
      const duration = end - start
      // dragTime 在点击是已经确定了点击处与事件开始时间的间距
      // dragTime = (mousedownTime as number) - start
      const newStart = (mousemoveTime as number) - dragTime
      const newEnd = newStart + duration
      dragEvent.start = newStart
      dragEvent.end = newEnd
      resetEvents(dragEvent, dragEvent)
      setMoving(true)
    }
  }, [mousemoveTime, dragTime])


  return (
    <MonthComponent
      onShowMore={onShowMore}
      onClickEvent={onClickEvent}
      onMousedownEvent={onMousedownEvent}
      onTimeContainerMouseup={onTimeContainerMouseup}
      onTimeContainerMousemove={onTimeContainerMousemove}
      onTimeContainerMousedown={onTimeContainerMousedown}
    />
  )
}
