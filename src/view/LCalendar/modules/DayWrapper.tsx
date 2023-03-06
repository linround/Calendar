import React, {
  useCallback, useContext, useEffect, useMemo
} from 'react'
import DayComponent from '../components/DayComponent'
import {
  CalendarContext, EventContext, MouseEventContext
} from '../props/propsContext'

import { IMouseEvent, IMouseTime } from '../utils/calendar'
import {
  isTruth,
  ROUND_TIME,
  roundTime,
  toTime
} from '../utils/timesStamp'
import { IDayWrapper } from './options'
import { createTimeEvent } from '../utils/events'


export const DayWrapper = React.forwardRef((props:IDayWrapper, ref) =>  {
  const { globalCache, setGlobalCacheValue, clearCreateEvent,
    createEvent, setCreateEvent,
    dragEvent, setDragEvent,
    dragTime, setDragTime,
    mousedownTime, setMousedownTime,
    mousemoveTime, setMousemoveTime,
    createStart, setCreateStart, } = props
  const { setShowCreatePopover,
    setShowNormalPopover,
    setNormalPopoverRef,
    setNormalEvent, } = useContext(MouseEventContext)
  const { resetEvents, } = useContext(EventContext)
  const { checks, groups, } = useContext(CalendarContext)
  const group = useMemo(() => checks[0] || groups[0], [checks, groups])

  /**
   * todo
   * 存储当前的这个currentRef
   * 存储当前的这个currentEvent
   */

  function clearNormal() {
    setShowNormalPopover(false)
    setNormalPopoverRef(null)
    setNormalEvent(null)
  }
  const onClickEvent = (e:IMouseEvent) => e
  const onMousedownEvent = (e: IMouseEvent) => {
    const { event, nativeEvent, } = e
    setGlobalCacheValue('currentMousedownRef', nativeEvent.currentTarget)
    setGlobalCacheValue('currentMousedownEvent', event)
    return e
  }


  const onMouseupEvent = (e:IMouseEvent) => e
  const onTimeContainerClick = (tms:IMouseTime) => tms
  const onTimeContainerMousedown = (tms:IMouseTime) => {
    const time = toTime(tms)
    setMousedownTime(time)
    // 在这里设置mousemoveTime
    // 由于鼠标一直在移动，所以确保点击下去的时候不是之前设置的time值
    setMousemoveTime(null)
    // 不是发生在事件上操作就直接非常规处理了
    if (!globalCache.currentMousedownEvent) {
      // 清除新建的事件
      clearCreateEvent()
      //清除普通事件点击之前的状态
      clearNormal()

    } else {
      // 发生在日历事件上
      // 为拖拽该事件做准备
      if (globalCache.currentMousedownEvent.isCreate) {
        setDragEvent(globalCache.currentMousedownEvent)
      } else  {
        setGlobalCacheValue('dragSource', globalCache.currentMousedownEvent)
        const dragEvent = {
          ...globalCache.currentMousedownEvent,
          isDragging: true,
        }
        // 记录dragEvent最终用该值替换dragSource
        setDragEvent(dragEvent)
      }

      if (globalCache.currentMousedownEvent.isCreate) {
        // 如果是发生在新建事件上
        // 关闭新建的popover 在子级有了这个行为
      } else {
        // 如果是发生在普通事件上
        // 清除新建事件的状态信息
        clearCreateEvent()
      }
    }
    return tms
  }



  const onTimeContainerMousemove = (tms:IMouseTime) => {
    if (!mousedownTime) return tms
    const time = toTime(tms)
    setMousemoveTime(time)
    return tms
  }

  const onTimeContainerMouseup = (tms:IMouseTime) => tms










  // 以下处理是对原有的日历时间进行拖拽
  // 还是新建的日历事件
  // 对于新建的日历事件
  // 依赖dragEvent(被拖拽的事件)
  // 和 点击处的时间点(mousedownTime)
  // 最终设置拖拽的时间段 dragTime
  useEffect(() => {
    // 对事件进行拖拽
    if (mousedownTime) {
      if (dragEvent) {
        const start = dragEvent.start
        const dragTime = mousedownTime as number - start
        setDragTime(dragTime)
      } else {
        const createStart = roundTime(mousedownTime  as number)
        const createEnd = createStart + (ROUND_TIME  * 60 * 1000)
        const createEvent = createTimeEvent(
          createStart, createEnd, group
        )
        setGlobalCacheValue('currentCreateEvent', createEvent)
        setCreateEvent(createEvent)
        setCreateStart(createStart)
      }
    }
  }, [mousedownTime, dragEvent])


  // 通过监听move事件的时间点，设置事件时间段
  // 单独的将 createEvent 这个事件的逻辑提取出来
  useEffect(() => {
    if (createEvent &&
      mousemoveTime &&
      createStart) {
      const mouseRound = roundTime(mousemoveTime as number)
      createEvent.start = Math.min(mouseRound, createStart  as number)
      createEvent.end = Math.max(mouseRound, createStart as number)
      resetEvents(createEvent, createEvent)
    }
  }, [createEvent, mousemoveTime, createStart])



  // 以下是点击日历事件，对日历事件进行拖拽的逻辑
  // 主要依赖拖拽的时间段 dragTime
  useEffect(() => {
    if (dragEvent) {
      if (isTruth(dragTime) && mousemoveTime) {
        const { start, end, } = dragEvent
        // 计算事件的时长
        const duration = end - start
        // 以下即: (mousemoveTime-mousedownTime) + start
        // 从而得到了一个新的开始时间
        const newStartTime = mousemoveTime as number - dragTime
        const newStart = roundTime(newStartTime)
        const newEnd = newStart + duration
        dragEvent.start = newStart
        dragEvent.end = newEnd

        setGlobalCacheValue('isDragging', true)

        resetEvents(dragEvent, dragEvent)
      }
    }
  }, [mousemoveTime, dragTime, dragEvent])

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
      <DayComponent
        ref={ref}
        onClickEvent={onClickEvent}
        onMousedownEvent={onMousedownEvent}
        onMouseupEvent={onMouseupEvent}

        onTimeContainerClick={onTimeContainerClick}
        onTimeContainerMousedown={onTimeContainerMousedown}
        onTimeContainerMousemove={onTimeContainerMousemove}
        onTimeContainerMouseup={onTimeContainerMouseup} />
    </>
  )
})
