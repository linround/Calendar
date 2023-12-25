import classnames from 'classnames'
import styles from './style/event.module.less'
import React, { useContext } from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import { mousedownController } from '../../utils/mouseDown'
import { RESIZE_ACTION_END } from '../../utils'
import { getTimeFromPoint } from '../../utils/point'
import { IntervalsContext } from '../../../props/propsContext'
import { toTime } from '../../../utils/timesStamp'


interface IProps {
  event:CalendarEvent
  days:CalendarTimestamp[]
  firstMinute:number
  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement

}
export function EndAnchor(props:React.PropsWithChildren<IProps>) {
  const {
    daysContainer,
    scrollContainer,
    days,
    firstMinute,
    event,

  } = props
  const {
    intervalHeight,
    intervalMinutes,
  } = useContext(IntervalsContext)
  function getRect() {
    // 整个滚动区域的容器
    const scrollRect = scrollContainer?.getBoundingClientRect()
    // 日历所有天数的容器
    const daysRect = daysContainer?.getBoundingClientRect()
    return {
      scrollRect, daysRect,
    }
  }

  const selector = new Selector()

  let initTime:number
  let initEnd:number
  let draggedEvent:CalendarEvent
  selector.on('beforeSelect', (coordinates:ICoordinates) => {
    mousedownController.setState(RESIZE_ACTION_END)

    const { scrollRect, daysRect, } = getRect()
    const timestamp = getTimeFromPoint(
      scrollRect,
      daysRect,
      coordinates,
      days,
      firstMinute,
      intervalHeight,
      intervalMinutes
    )

    draggedEvent = {
      ...event,
    }

    initEnd = draggedEvent.end
    initTime = toTime(timestamp)
    console.log('beforeSelect')
    return false
  })
  selector.on('selecting', (coordinates:ICoordinates) => {
    const { scrollRect, daysRect, } = getRect()
    const timestamp = getTimeFromPoint(
      scrollRect,
      daysRect,
      coordinates,
      days,
      firstMinute,
      intervalHeight,
      intervalMinutes
    )

    const time = toTime(timestamp)
    const diffTime = time - initTime
    const newEnd = initEnd
    console.log('selecting')
  })
  selector.on('select', (coordinates:ICoordinates) => {
    console.log('select')
  })
  const onMouseDown = (event:React.MouseEvent) => {
    event.stopPropagation()
    selector.handleInitialEvent(event)
  }

  return (
    <div
      className={classnames({
        [styles.eventAnchor]: true,
        'eventAnchor': true,
      })}
      onMouseDown={onMouseDown}
    >=</div>
  )
}
