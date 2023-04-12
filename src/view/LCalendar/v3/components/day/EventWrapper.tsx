import React, {
  createRef, ReactElement, useContext
} from 'react'
import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import { ICoordinates } from '../../../v2/utils/selection'
import { Selector } from '../../utils/selector'
import { getTimeFromPoint } from '../../utils/point'
import { roundTime, toTime } from '../../../utils/timesStamp'
import { EventContext, IntervalsContext } from '../../../props/propsContext'

interface IProps {
  event:CalendarEvent
  days:CalendarTimestamp[]
  firstMinute:number
  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement
}
export function EventWrapperComponent(props:React.PropsWithChildren<IProps>) {
  const {
    event,
    days,
    firstMinute,
    daysContainer,
    scrollContainer,
  } = props
  const {
    intervalHeight,
    intervalMinutes,
  } = useContext(IntervalsContext)
  const { setDraggedEvent, } = useContext(EventContext)

  const ref = createRef()
  const selector:Selector = new Selector()
  // 整个滚动区域的容器
  const scrollRect = scrollContainer?.getBoundingClientRect()
  // 日历所有天数的容器
  const daysRect = daysContainer?.getBoundingClientRect()


  let initTime:number
  let draggedEvent:CalendarEvent
  selector.on('beforeSelect', (data:ICoordinates) => {
    const timestamp = getTimeFromPoint(
      scrollRect, daysRect, data, days, firstMinute, intervalHeight, intervalMinutes
    )
    initTime = toTime(timestamp)
  })
  selector.on('selecting', (data:ICoordinates) => {
    const timestamp = getTimeFromPoint(
      scrollRect, daysRect, data, days, firstMinute, intervalHeight, intervalMinutes
    )
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
    setDraggedEvent([draggedEvent])



  })
  selector.on('select', (data:ICoordinates) => {
    setDraggedEvent([])
  })
  return (
    <>
      {
        React.cloneElement(props.children as ReactElement, {
          ref: ref,
          onMouseDown(e:React.MouseEvent) {
            selector.handleInitialEvent(e)
          },
        })
      }
    </>
  )
}
