import React, {
  createRef,
  ReactElement, useContext, useEffect, useLayoutEffect, useRef
} from 'react'
import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import { ICoordinates } from '../../../v2/utils/selection'
import { Selector } from '../../utils/selector'
import { getTimeFromPoint } from '../../utils/point'
import { roundTime, toTime } from '../../../utils/timesStamp'
import {
  EventContext, IntervalsContext, MouseEventContext
} from '../../../props/propsContext'
import { updateEvent } from '../../../../../api'
import { SUCCESS_CODE } from '../../../../../request'
import {
  CREATED_ACTION, DRAGGED_ACTION, IEventAction, NORMAL_ACTION
} from '../../utils'

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
      setShowCreatePopoverV3(true)
    }
  }, [ref.current])





  const selector:Selector = new Selector()
  // 整个滚动区域的容器
  const scrollRect = scrollContainer?.getBoundingClientRect()
  // 日历所有天数的容器
  const daysRect = daysContainer?.getBoundingClientRect()


  let initTime:number
  let isClick:boolean
  let draggedEvent:CalendarEvent
  selector.on('beforeSelect', (data:ICoordinates) => {
    const timestamp = getTimeFromPoint(
      scrollRect, daysRect, data, days, firstMinute, intervalHeight, intervalMinutes
    )
    draggedEvent = {
      ...event,
    }
    initTime = toTime(timestamp)
    setShowCreatePopoverV3(false)
    isClick = true
    return false
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
    isClick = false
    setDraggedEvent(draggedEvent)
  })
  selector.on('select', async (data:ICoordinates) => {

    if (isClick) {
      setNormalEvent(event)
      setNormalPopoverRef(normalRef.current)
      setShowNormalPopover(true)
    }
    switch (eventAction) {
    case NORMAL_ACTION:{
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

  })
  return (
    <>
      {React.cloneElement(props.children as ReactElement, {

        ref: eventAction === CREATED_ACTION ? ref : normalRef,
        onMouseDown(e:React.MouseEvent) {
          selector.handleInitialEvent(e)
        },
      })}
    </>
  )
}
