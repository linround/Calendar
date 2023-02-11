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

export const DayWrapper = React.forwardRef((props, ref) =>  {
  const { setRef,
    selectedRef,
    mousedownRef,
    setMouseDownRef,
    popoverRef,
    setPopoverRef,
    setPopoverEvent,
    showPopover,
    setShowPopover,
    createPopoverEvent,
    setCreatePopoverEvent,

    setCreatePopoverCoordinate,

    showCreatePopover,
    setShowCreatePopover,

    createEvent,
    setCreateEvent,
    setMousedownEvent,

    popover,
    setPopover, } = useContext(MouseEventContext)
  const { events, resetEvents, } = useContext(EventContext)
  const [dragEvent, setDragEvent] = useState<CalendarEvent | null>(null)
  const [dragTime, setDragTime] = useState<number|null>(null)
  const [mousedownTime, setMousedownTime] = useState<number|null>(null)
  const [mousemoveTime, setMousemoveTime] = useState<number|null>(null)
  const [createStart, setCreateStart] = useState<number| null>(null)

  // 执行顺序，
  // todo  container是容器 event是其中的子元素
  // onMousedownEvent       => onTimeContainerMousedown => onMouseupEvent
  // onTimeContainerMouseup => onClickEvent             => onTimeContainerClick


  const onClickEvent = useCallback((e:IMouseEvent) => e, [mousedownRef, popover])
  const mousedownEvent:{value:CalendarEvent| null} = {
    value: null,
  }
  // 只能右键
  // 问题原因是因为在onMousedownEvent一开始就设置了 ref
  const onMousedownEvent = (e: IMouseEvent) => {
    const { event, nativeEvent, } = e
    setRef(nativeEvent.currentTarget)
    mousedownEvent.value = event
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


    setShowCreatePopover(false)
    if (!mousedownEvent.value) {
      setShowPopover(false)
      setRef(null)
      setPopoverRef(null)
    } else {
      if (!mousedownEvent.value.isCreate) {
        setDragEvent(mousedownEvent.value)
        setCreatePopoverEvent(null)
        setShowPopover(true)
      } else {
        setDragEvent(mousedownEvent.value)
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
    const { nativeEvent, } = tms
    if (createEvent) {
      setCreatePopoverEvent(createEvent)
      setShowCreatePopover(true)
      //  设置createPopover坐标点
      setCreatePopoverCoordinate([
        nativeEvent.clientX,
        nativeEvent.clientY
      ])
    } else {
      if (dragEvent) {
        if (!dragEvent.isCreate) {
          setPopoverEvent(dragEvent)
          setShowPopover(true)
          setPopoverRef(selectedRef)
        } else {
          setCreatePopoverEvent(dragEvent)
          setShowCreatePopover(true)
          setCreatePopoverCoordinate([
            nativeEvent.clientX,
            nativeEvent.clientY
          ])
        }
      }
    }
    clear()
    return tms
  }, [createEvent, dragEvent])



  function clear() {
    setDragEvent(null)
    mousedownEvent.value = null
    setMousedownTime(null)
    setMousemoveTime(null)
    setCreateEvent(null)
    setCreateStart(null)
  }







  // 以下处理是对原有的日历时间进行拖拽
  // 还是新建的日历事件
  // 对于新建的日历事件 依赖dragEvent(被拖拽的事件) 和 点击处的时间点(mousedownTime)
  // 最终设置拖拽的时间段 dragTime
  useEffect(() => {
    // 对事件进行拖拽
    if (mousedownTime) {
      if (dragEvent) {
        const start = dragEvent.start
        const dragTime = mousedownTime - start
        setDragTime(dragTime)
        if (dragEvent.isCreate) {
          setShowCreatePopover(true)
        }
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
        setShowCreatePopover(true)
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
        resetEvents(dragEvent, dragEvent)
      }
    }
  }, [mousemoveTime, dragTime, dragEvent])


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
