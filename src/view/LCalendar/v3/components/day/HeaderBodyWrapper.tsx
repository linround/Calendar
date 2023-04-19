import React, { ReactElement, useContext } from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { CalendarTimestamp } from '../../../utils/calendar'
import { getDayTimeFromDaysPoint } from '../../utils/point'
import { toTime } from '../../../utils/timesStamp'
import { adjustTime, NORMAL_ACTION } from '../../utils'
import { createTimeEvent } from '../../../utils/events'
import {
  CalendarContext, EventContext, MouseEventContext
} from '../../../props/propsContext'
import { mousedownController } from '../../utils/mouseDown'

interface IProps {
  container:HTMLDivElement
  days:CalendarTimestamp[]
}
export function HeaderBodyWrapper(props:React.PropsWithChildren<IProps>) {
  const {
    children,
    container,
    days,
  } = props

  const {
    setShowCreatePopoverV3,
  } = useContext(MouseEventContext)
  const {
    setCreatedEvent,
  } = useContext(EventContext)
  const { group, } = useContext(CalendarContext)
  const selector = new Selector()
  const containerRect = container?.getBoundingClientRect()
  let initTime:number
  selector.on('beforeSelect', (coordinates:ICoordinates) => {
    const timestamp = getDayTimeFromDaysPoint(
      containerRect, days, coordinates
    )
    initTime = toTime(timestamp)
    return mousedownController.action === NORMAL_ACTION
  })
  selector.on('selecting', (coordinates:ICoordinates) => {
    const timestamp = getDayTimeFromDaysPoint(
      containerRect, days, coordinates
    )
    const timePoint = toTime(timestamp)
    const { startTime, endTime, } = adjustTime(initTime, timePoint)
    const event = createTimeEvent(
      startTime, endTime, group, true
    )
    event.isCreate = true
    setShowCreatePopoverV3(false)
    setCreatedEvent(event)
  })
  selector.on('select', (coordinates:ICoordinates) => {
    setShowCreatePopoverV3(true)
  })
  return React.cloneElement(children as ReactElement, {
    onMouseDown(e:React.MouseEvent) {
      selector.handleInitialEvent(e)

    },
  })
}
