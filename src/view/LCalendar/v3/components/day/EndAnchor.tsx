import classnames from 'classnames'
import styles from './style/event.module.less'
import React, { useContext } from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import { mousedownController } from '../../utils/mouseDown'
import {
  CREATED_ACTION, IEventAction, NORMAL_ACTION, RESIZE_ACTION_END
} from '../../utils'
import { getTimeFromPoint } from '../../utils/point'
import {
  EventContext, IntervalsContext, MouseEventContext
} from '../../../props/propsContext'
import { roundTime, toTime } from '../../../utils/timesStamp'
import { updateEvent } from '../../../../../api'
import { SUCCESS_CODE } from '../../../../../request'


interface IProps {
  event:CalendarEvent
  days:CalendarTimestamp[]
  firstMinute:number
  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement
  eventAction:IEventAction

}
export function EndAnchor(props:React.PropsWithChildren<IProps>) {
  const {
    daysContainer,
    scrollContainer,
    days,
    firstMinute,
    event,
    eventAction,

  } = props

  const {
    updateEventList,
  } = useContext(MouseEventContext)

  const { setDraggedEvent, setCreatedEvent, } = useContext(EventContext)

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

  const selector = new Selector(scrollContainer)

  let initTime:number
  let initEnd:number
  let resizeEvent:CalendarEvent
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

    resizeEvent = {
      ...event,
    }

    initEnd = resizeEvent.end
    initTime = toTime(timestamp)
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

    const time = toTime(timestamp) // 拖拽处的时间戳
    const diffTime = time - initTime // 拖拽处的时间点 减 初始点击处的时间点 得到当前操作的时间 变化值
    const newEnd = roundTime(initEnd + diffTime) // 初始的结束时间

    resizeEvent = {
      ...event,
      end: newEnd < event.start ? event.start : newEnd,
    }

    switch (eventAction) {
    case NORMAL_ACTION:{
      setDraggedEvent(resizeEvent)
      break
    }
    case CREATED_ACTION:{
      console.log(eventAction)
      setCreatedEvent(resizeEvent)
      break
    }
    }
  })
  selector.on('select', async (coordinates:ICoordinates) => {

    switch (eventAction) {
    case NORMAL_ACTION:{
      const { code, } = await updateEvent(resizeEvent)
      if (code === SUCCESS_CODE) {
        setDraggedEvent(null)
        updateEventList()
      }
      break
    }

    case CREATED_ACTION:{
      console.log(eventAction)
      setCreatedEvent(resizeEvent)
      break
    }
    }
    mousedownController.clearState()
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
