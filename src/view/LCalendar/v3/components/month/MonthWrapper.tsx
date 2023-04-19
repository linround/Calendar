import React, { useContext } from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { IMonth } from '../../../components/type'
import { getDayTimeFromPoint } from '../../utils/point'
import { toTime } from '../../../utils/timesStamp'
import {
  CalendarContext, EventContext, MouseEventContext
} from '../../../props/propsContext'
import { createTimeEvent } from '../../../utils/events'
import { adjustTime, NORMAL_ACTION } from '../../utils'
import { mousedownController } from '../../utils/mouseDown'

interface IProps {
  container:HTMLDivElement
  month:IMonth
}
export function MonthWrapper(props:React.PropsWithChildren<IProps>) {

  const {
    children,
    container,
    month,
  } = props
  const {
    setShowCreatePopoverV3,
  } = useContext(MouseEventContext)
  const {
    setCreatedEvent,
  } = useContext(EventContext)
  const { group, } = useContext(CalendarContext)

  const containerRect = container?.getBoundingClientRect()
  const selector = new Selector()
  let initTime:number
  selector.on('beforeSelect', (data:ICoordinates) => {
    const timestamp = getDayTimeFromPoint(
      containerRect, month, data
    )
    initTime = toTime(timestamp)
    // 在mouthWrapper内 点击在普通事件上的
    // 不再由外部处理相关的mousedown和mouseup 事件
    return mousedownController.action === NORMAL_ACTION
  })
  selector.on('selecting', (data:ICoordinates) => {
    const timestamp = getDayTimeFromPoint(
      containerRect, month, data
    )
    const timPoint = toTime(timestamp)
    const { startTime, endTime, } = adjustTime(initTime, timPoint)
    const event = createTimeEvent(
      startTime, endTime, group, true
    )
    event.isCreate = true
    setShowCreatePopoverV3(false)
    setCreatedEvent(event)
  })
  selector.on('select', (data:ICoordinates) => {
    setShowCreatePopoverV3(true)
  })

  return React.cloneElement(children as React.ReactElement, {
    onMouseDown(e:React.MouseEvent) {
      selector.handleInitialEvent(e)
    },
  })
}
