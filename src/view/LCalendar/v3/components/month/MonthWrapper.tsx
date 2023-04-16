import React, { useContext } from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { IMonth } from '../../../components/type'
import { getDayTimeFromPoint } from '../../utils/point'
import { toTime } from '../../../utils/timesStamp'
import { CalendarContext, EventContext } from '../../../props/propsContext'
import { createTimeEvent } from '../../../utils/events'
import { adjustTime } from '../../utils'

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
  })
  selector.on('selecting', (data:ICoordinates) => {
    const timestamp = getDayTimeFromPoint(
      containerRect, month, data
    )
    const timPoint = toTime(timestamp)
    const { startTime, endTime, } = adjustTime(initTime, timPoint)
    const event = createTimeEvent(
      startTime, endTime, group
    )
    setCreatedEvent(event)
  })
  selector.on('select', (data:ICoordinates) => {

  })

  return React.cloneElement(children as React.ReactElement, {
    onMouseDown(e:React.MouseEvent) {
      selector.handleInitialEvent(e)
    },
  })
}
