import classnames from 'classnames'
import styles from './style/event.module.less'
import React from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'


interface IProps {
  event:CalendarEvent
  days:CalendarTimestamp[]
  firstMinute:number
  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement

}
export function EndAnchor(props:React.PropsWithChildren<IProps>) {
  const { daysContainer, scrollContainer, } = props
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
  selector.on('beforeSelect', (coordinates:ICoordinates) => {
    console.log('beforeSelect')
  })
  selector.on('selecting', (coordinates:ICoordinates) => {
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
