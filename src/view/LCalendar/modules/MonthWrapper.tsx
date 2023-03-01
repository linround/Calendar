import React, {
  useCallback,
  useContext, useEffect, useState
} from 'react'
import { MonthComponent } from '../components/MonthComponent'
import { EventContext, MouseEventContext } from '../props/propsContext'
import {
  IMonthMouseTime, IMouseEvent, VTimestampInput
} from '../utils/calendar'
import localizer from '../utils/segments/localizer'
import { isTruth, roundTime } from '../utils/timesStamp'
import { ISlots } from '../components/type'
import { IMonthWrapper } from './options'
import { createTimeEvent } from '../utils/events'

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

  const [isMore, setIsMore] = useState<boolean>(false)
  const [createEnd, setCreateEnd] = useState<VTimestampInput| null>(null)

  //
  const onClickEvent = (e:IMouseEvent) => e
  const onMousedownEvent = (e:IMouseEvent) => {
    const { event, nativeEvent, } = e
    // 这里为了处理在月视图中的不正常渲染
    if (createPopoverRef && !event.isCreate) {
      return e
    }
    setGlobalCacheValue('currentMousedownRef', nativeEvent.currentTarget)
    setGlobalCacheValue('currentMousedownEvent', event)
    return e
  }
  const onShowMore = (arg:ISlots) => {
    console.log(arg, 'more')
    setIsMore(true)
  }



  function clearNormal() {
    setShowNormalPopover(false)
    setNormalPopoverRef(null)
    setNormalEvent(null)
  }

  const onMouseupEvent = (e:IMouseEvent) => e
  const onTimeContainerClick = (tms:IMonthMouseTime) => tms
  const onTimeContainerMousedown = (tms:IMonthMouseTime) => {

    setMousedownTime(tms.value)
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
      } else {
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
        const createEvent = createTimeEvent(createStart, createEnd)

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
    <MonthComponent
      ref={ref}
      onShowMore={onShowMore}
      onClickEvent={onClickEvent}
      onMousedownEvent={onMousedownEvent}
      onMouseupEvent={onMouseupEvent}


      onTimeContainerClick={onTimeContainerClick}
      onTimeContainerMouseup={onTimeContainerMouseup}
      onTimeContainerMousemove={onTimeContainerMousemove}
      onTimeContainerMousedown={onTimeContainerMousedown}
    />
  )
})
