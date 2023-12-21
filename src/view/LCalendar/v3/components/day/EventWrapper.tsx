import React, {
  ReactElement, useContext, useLayoutEffect, useRef, useState
} from 'react'
import style from './style/eventWrapper.module.less'
import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import { ICoordinates } from '../../../v2/utils/selection'
import { Selector } from '../../utils/selector'
import { getTimeFromPoint } from '../../utils/point'
import { roundTime, toTime } from '../../../utils/timesStamp'
import { mousedownController } from '../../utils/mouseDown'
import {
  EventContext, IntervalsContext, MouseEventContext
} from '../../../props/propsContext'
import { updateEvent } from '../../../../../api'
import { SUCCESS_CODE } from '../../../../../request'
import {
  CREATED_ACTION, IEventAction, NORMAL_ACTION
} from '../../utils'
import classnames from 'classnames'

interface IProps {
  event:CalendarEvent
  days:CalendarTimestamp[]
  firstMinute:number
  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement
  eventAction:IEventAction

}
export const  EventWrapperComponent = function(props:React.PropsWithChildren<IProps>) {
  const {
    event,
    days,
    firstMinute,
    daysContainer,
    scrollContainer,
    eventAction,
  } = props
  const [moving, setMoving] = useState<boolean>(false)
  const {
    intervalHeight,
    intervalMinutes,
  } = useContext(IntervalsContext)
  const {
    updateEventList,
    setShowCreatePopoverV3,
    setCreatePopoverRefV3,
    setShowNormalPopover,
    setNormalEvent,
    setNormalPopoverRef,
  } = useContext(MouseEventContext)
  const { setDraggedEvent, setCreatedEvent, } = useContext(EventContext)
  const normalRef = useRef<Element|null>(null)




  const ref = useRef<HTMLDivElement>()
  useLayoutEffect(() => {
    if (ref.current) {
      setCreatePopoverRefV3(ref.current)
    }
  }, [ref.current])

  function clearCreated() {
    setCreatedEvent(null)
    setCreatePopoverRefV3(null)
    setShowCreatePopoverV3(false)
  }
  function clearNormal() {
    setNormalEvent(null)
    setNormalPopoverRef(null)
    setShowNormalPopover(false)
  }
  function hideCreate() {
    setShowCreatePopoverV3(false)
  }


  const selector:Selector = new Selector(scrollContainer)
  function getRect() {
    // 整个滚动区域的容器
    const scrollRect = scrollContainer?.getBoundingClientRect()
    // 日历所有天数的容器
    const daysRect = daysContainer?.getBoundingClientRect()
    return {
      scrollRect, daysRect,
    }
  }


  let initTime:number
  // 用于判断在 事件上的mousedown 事件是否是点击事件
  // 如果发生moving，那么就是拖拽事件
  // 如果是点击事件，针对normalEvent
  // 需要设置显示详情信息
  let isClick:boolean
  let draggedEvent:CalendarEvent
  selector.on('beforeSelect', (data:ICoordinates) => {
    // 记录mousedown事件发生时的状态信息
    mousedownController.setState(eventAction)

    // 如果点击的是普通的事件，
    // 需要清除创建事件相关的数据
    eventAction === NORMAL_ACTION && clearCreated()


    const { scrollRect, daysRect, } = getRect()
    const timestamp = getTimeFromPoint(
      scrollRect, daysRect, data, days, firstMinute, intervalHeight, intervalMinutes
    )
    draggedEvent = {
      ...event,
    }
    initTime = toTime(timestamp)
    isClick = true
    return false
  })
  selector.on('selecting', (data:ICoordinates) => {

    const { scrollRect, daysRect, } = getRect()

    const timestamp = getTimeFromPoint(
      scrollRect,
      daysRect,
      data,
      days,
      firstMinute,
      intervalHeight,
      intervalMinutes
    )
    // if (scrollContainer) {
    //   setTimeout(() => {
    //     scrollContainer.scrollTop = scrollContainer.scrollTop + 10
    //   }, 200)
    // }
    const time = toTime(timestamp)

    // 计算原本事件的时长
    const duration = event.end - event.start
    const newStart = roundTime(time - initTime + event.start)
    const newEnd = newStart + duration
    draggedEvent = {
      ...event,
      start: newStart,
      end: newEnd,
    }
    isClick = false
    setMoving(true)

    // 对于普通的事件的拖拽过程中需要清空normal相关的popover数据
    switch (eventAction) {
    case NORMAL_ACTION:{
      clearNormal()
      break
    }
    }

    hideCreate()
    setDraggedEvent(draggedEvent)
  })
  selector.on('select', async (data:ICoordinates) => {


    switch (eventAction) {
    case NORMAL_ACTION:{
      if (isClick) {
        setNormalEvent(event)
        setNormalPopoverRef(normalRef.current)
        setShowNormalPopover(true)
      }
      const { code, } = await updateEvent(draggedEvent)
      if (code === SUCCESS_CODE) {
        setDraggedEvent(null)
        updateEventList()
      }
      break
    }
    case CREATED_ACTION:{
      setCreatedEvent(draggedEvent)
      setDraggedEvent(null)
      setShowCreatePopoverV3(true)
      break
    }
    }
    setMoving(false)
    mousedownController.clearState()
  })
  const className = classnames({
    [(props.children as ReactElement)?.props.className]: true,
    [style.moving]: moving,
  })
  return (
    <>
      {React.cloneElement(props.children as ReactElement, {
        ref: eventAction === CREATED_ACTION ? ref : normalRef,
        className: className,
        onMouseDown(e:React.MouseEvent) {
          selector.handleInitialEvent(e)
        },
      })}
    </>
  )
}
