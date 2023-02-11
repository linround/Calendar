import React, {
  useCallback, useContext, useEffect, useRef, useState
} from 'react'
import DayComponent from '../components/DayComponent'
import { EventContext, MouseEventContext } from '../props/propsContext'

import {
  CalendarEvent, IMouseEvent, IMouseTime
} from '../utils/calendar'
import {
  isTruth,
  ROUND_TIME,
  roundTime,
  toTime
} from '../utils/timesStamp'
import { IS_FULL_WIDTH } from '../components/type'
import { stopDefaultEvent } from '../utils/events'
import { IGlobalCache } from '../props/type'


export const DayWrapper = React.forwardRef((props:{
  globalCache:IGlobalCache,
  clearCreateEvent:()=>void,
  setGlobalCacheValue: (k:keyof IGlobalCache, v: any) => void
}, ref) =>  {
  const { globalCache, setGlobalCacheValue, clearCreateEvent, } = props
  const { mousedownRef,
    setCreatePopoverEvent,
    createEvent,
    setCreateEvent,
    popover,
    setShowCreatePopover,
    setShowNormalPopover,
    setNormalPopoverRef,
    setNormalEvent, } = useContext(MouseEventContext)
  const { events, resetEvents, setEvents, } = useContext(EventContext)
  const [dragEvent, setDragEvent] = useState<CalendarEvent | null>(null)
  const [dragTime, setDragTime] = useState<number|null>(null)
  const [mousedownTime, setMousedownTime] = useState<number|null>(null)
  const [mousemoveTime, setMousemoveTime] = useState<number|null>(null)
  const [createStart, setCreateStart] = useState<number| null>(null)

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
  function clearGlobal() {
    setGlobalCacheValue('currentMousedownEvent', null)
    setGlobalCacheValue('currentMousedownRef', null)
    setGlobalCacheValue('currentCreateEvent', null)
    setGlobalCacheValue('isDragEvent', false)
  }
  function clear() {
    setMousedownTime(null)
    setMousemoveTime(null)
    setCreateEvent(null)
    setCreateStart(null)
    setDragEvent(null)
  }
  const onClickEvent = useCallback((e:IMouseEvent) => e, [mousedownRef, popover])
  const onMousedownEvent = (e: IMouseEvent) => {
    const { event, nativeEvent, } = e
    setGlobalCacheValue('currentMousedownRef', nativeEvent.currentTarget)
    setGlobalCacheValue('currentMousedownEvent', event)
    setShowCreatePopover(false)
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
      setDragEvent(globalCache.currentMousedownEvent)

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



  const onTimeContainerMousemove = useCallback((tms:IMouseTime) => {
    if (!mousedownTime) return tms
    const time = toTime(tms)
    setMousemoveTime(time)
    return tms
  }, [mousedownTime])

  const onTimeContainerMouseup = useCallback((tms:IMouseTime) => {
    // 如果点击在事件上
    if (globalCache.currentMousedownEvent) {
      if (globalCache.currentMousedownEvent.isCreate) {
        // 如果点击在create时间上结束的
        // 显示createPopover
        setShowCreatePopover(true)
      } else {
      // 如果点击事件是在 normal 事件上结束
        if (!globalCache.isDragEvent) {
          // 对normal事件执行的是不是拖拽操作功能
          //  显示normalPopover
          setNormalEvent(globalCache.currentMousedownEvent)
          setNormalPopoverRef(globalCache.currentMousedownRef)
          setShowNormalPopover(true)
        }
      }
    } else {
      if (dragEvent) {
        // 是对事件拖拽结束
        if (!dragEvent.isCreate) {
          setShowNormalPopover(true)
          setNormalEvent(globalCache.currentMousedownEvent)
          setNormalPopoverRef(globalCache.currentMousedownRef)
        } else {
          setCreatePopoverEvent(dragEvent)
          setShowCreatePopover(true)
        }
      } else {
        // 创建事件结束
        setShowCreatePopover(true)
      }
    }
    clear()
    clearGlobal()
    return tms
  }, [createEvent, dragEvent])










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
        const dragTime = mousedownTime - start
        setDragTime(dragTime)
      } else {
        const createStart = roundTime(mousedownTime)
        const createEnd = createStart + (ROUND_TIME  * 60 * 1000)
        const createEvent = {
          id: Date.now(),
          name: `日历事件 ${events.length}`,
          color: 'black',
          start: createStart,
          end: createEnd,
          timed: true,
          allDay: false,
          isCreate: true,
          author: '作者作者作者作者作者作者作者作者作者作者作者作者作者作者',
          location: '地点地点地点地点地点地点地点地点地点地点地点地点地点地点',
          personnel: '人员人员人员人员人员人员人员人员人员人员人员人员人员人员',
        }
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
      const mouseRound = roundTime(mousemoveTime)
      createEvent.start = Math.min(mouseRound, createStart)
      createEvent.end = Math.max(mouseRound, createStart)
      setGlobalCacheValue('currentCreateEvent', createEvent)
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
        const newStartTime = mousemoveTime - dragTime
        const newStart = roundTime(newStartTime)
        const newEnd = newStart + duration
        dragEvent.start = newStart
        dragEvent.end = newEnd

        setGlobalCacheValue('isDragEvent', true)
        resetEvents(dragEvent, dragEvent)
      }
    }
  }, [mousemoveTime, dragTime, dragEvent])
  useEffect(() => {
    if (globalCache.isDragEvent) {
      // 如果执行的是拖拽的操作就不在显示normal弹框
      clearNormal()
    }
  }, [globalCache.isDragEvent])


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
