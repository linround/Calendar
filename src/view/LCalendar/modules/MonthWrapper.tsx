import React, {
  useContext, useEffect, useState
} from 'react'
import {
  CalendarContext, EventContext, MouseEventContext
} from '../props/propsContext'
import { VTimestampInput } from '../utils/calendar'
import localizer from '../utils/segments/localizer'
import { isTruth, roundTime } from '../utils/timesStamp'
import { IMonthWrapper } from './options'
import { createTimeEvent } from '../utils/events'
import { V3MonthComponent } from '../v3/components/month/Month'

export const MonthWrapper = React.forwardRef((props:IMonthWrapper, ref) => {
  const { globalCache, setGlobalCacheValue,
    createEvent, setCreateEvent,
    dragEvent, setDragEvent,
    dragTime, setDragTime,
    mousedownTime, setMousedownTime,
    mousemoveTime, setMousemoveTime,
    createStart, setCreateStart,
    clearCreateEvent, } = props
  const { resetEvents, } = useContext(EventContext)
  const { setShowCreatePopover,
    setShowNormalPopover,
    setNormalPopoverRef,
    createPopoverRef,
    setNormalEvent, } = useContext(MouseEventContext)
  const { group, } = useContext(CalendarContext)
  const [isMore, setIsMore] = useState<boolean>(false)
  const [createEnd, setCreateEnd] = useState<VTimestampInput| null>(null)





  function clearNormal() {
    setShowNormalPopover(false)
    setNormalPopoverRef(null)
    setNormalEvent(null)
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
        const createEvent = createTimeEvent(
          createStart, createEnd, group
        )

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

      setGlobalCacheValue('isDragging', true)

      resetEvents(dragEvent, dragEvent)
    }
  }, [mousemoveTime, dragTime])

  useEffect(() => {
    if (globalCache.isDragging) {
      // 如果执行的是拖拽的操作就不在显示normal弹框
      clearNormal()
      // 对create事件执行拖拽操作在短暂时间不显示
      setShowCreatePopover(false)
      if (globalCache.dragSource) {
        globalCache.dragSource.dragged = true
      }

    }
  }, [globalCache.isDragging])

  return (
    <>
      <V3MonthComponent />
    </>

  )
})
