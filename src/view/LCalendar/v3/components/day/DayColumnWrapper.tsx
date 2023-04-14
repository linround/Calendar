import React, {
  ReactElement, useContext, useRef
} from 'react'
import { Selector } from '../../utils/selector'
import { getEventNodeFromPoint, ICoordinates } from '../../../v2/utils/selection'
import { CalendarTimestamp } from '../../../utils/calendar'
import { getTimeFromPoint } from '../../utils/point'
import { roundTime, toTime } from '../../../utils/timesStamp'
import {
  CalendarContext, EventContext, IntervalsContext, MouseEventContext
} from '../../../props/propsContext'
import { createTimeEvent } from '../../../utils/events'

interface IProps {
  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement

  days:CalendarTimestamp[]
  firstMinute:number
}
export function V3DayColumnWrapperComponent(props:React.PropsWithChildren<IProps>) {

  const {
    intervalHeight,
    intervalMinutes,
  } = useContext(IntervalsContext)
  const ref = useRef<HTMLDivElement>()
  const {
    setCreatedEvent,

  } = useContext(EventContext)

  const {
    setShowCreatePopoverV3,
    setCreatePopoverRefV3,

    setShowNormalPopover,
    setNormalEvent,
    setNormalPopoverRef,
  } = useContext(MouseEventContext)

  function clearCreatedEvent() {
    setCreatedEvent(null)
    setCreatePopoverRefV3(null)
    setShowCreatePopoverV3(false)
  }
  function clearNormal() {
    setNormalEvent(null)
    setNormalPopoverRef(null)
    setShowNormalPopover(false)
  }
  const { group, } = useContext(CalendarContext)
  const { daysContainer, days, firstMinute, scrollContainer, } = props
  const selector = new Selector()
  // 整个滚动区域的容器
  const scrollRect = scrollContainer?.getBoundingClientRect()
  // 日历所有天数的容器
  const daysRect = daysContainer?.getBoundingClientRect()

  let initTime:number
  selector.on('beforeSelect', (data:ICoordinates) => {
    // 只有当选中的不是事件节点时才会组织添加监听mousemove,mouseup事件
    const stop = !!getEventNodeFromPoint(daysContainer, data)
    if (!stop) {
      clearNormal()
    }
    clearCreatedEvent()
    const timestamp = getTimeFromPoint(
      scrollRect,
      daysRect,
      data,
      days,
      firstMinute,
      intervalHeight,
      intervalMinutes
    )
    initTime = toTime(timestamp)

    return stop
  })
  selector.on('selecting', (data:ICoordinates) => {

    const dayContainer = ref.current
    const dayRect = dayContainer?.getBoundingClientRect()
    // 在这里需要传入某天的坐标范围(dayRect)，
    // 防止跨天的时间计算
    // 如果不传（dayRect），会计算跨天的时间
    const timestamp = getTimeFromPoint(
      scrollRect, daysRect, data, days, firstMinute, intervalHeight, intervalMinutes, dayRect
    )
    const currentTime = toTime(timestamp)
    const moveTime = roundTime(currentTime)
    const downTime = roundTime(initTime)

    const startTime = Math.min(downTime, moveTime)
    const endTime = Math.max(downTime, moveTime)

    const createdEvent = createTimeEvent(
      startTime, endTime, group
    )
    setShowCreatePopoverV3(false)
    setCreatedEvent(createdEvent)
  })
  selector.on('select', (data:ICoordinates) => {
    setShowCreatePopoverV3(true)
  })
  return React.cloneElement(props.children as ReactElement, {
    ref,
    onMouseDown(e:React.MouseEvent) {
      selector.handleInitialEvent(e)
    },
  })
}
