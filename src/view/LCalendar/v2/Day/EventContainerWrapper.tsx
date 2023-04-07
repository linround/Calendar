import React, {
  createRef, ReactElement, useContext, useEffect, useState
} from 'react'
import { IEventRangeResult, ISlotMetrics } from '../utils/timeSlots'
import { timeViewContainer } from '../utils/day'
import {
  getBoundsForNode, getEventNodeFromPoint, IBounds, IEventCoordinatesData, Selection
} from '../utils/selection'
import { CalendarContext } from '../createContext'
import { IContextProps, IDirection } from '../context'
import { eventTimes, pointInColumn } from '../utils/common'
import { CalendarEvent } from '../../utils/calendar'
import localizer from '../../utils/segments/localizer'

interface IEventContainerWrapper {
  slotMetrics:ISlotMetrics
}
interface IState {
  top?:number,
  height?:number
  event?:CalendarEvent
}
export function EventContainerWrapper(props:React.PropsWithChildren<IEventContainerWrapper>) {

  const { children, slotMetrics, } = props
  const ref = createRef<HTMLDivElement>()
  const [state, setState] = useState<IState>({})
  const context = useContext(CalendarContext) as IContextProps
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false)
  const [eventOffsetTop, setEventOffsetTop] = useState<number>(0)

  const handleReset = () => {
    if (state.event) {
      setState({})
    }
  }

  const handleUpdate = (event:CalendarEvent, { startDate, endDate, top, height, }:IEventRangeResult) => {
    const { event: lastEvent, } = state
    if (lastEvent && startDate === lastEvent.start && endDate === lastEvent.end) return
    setState({
      top, height,
      event: {
        ...event, start: startDate, end: endDate,
      },
    })
  }
  const handleSelectable = ():void => {
    const wrapper = ref.current as HTMLDivElement
    const node = wrapper.children[0] as HTMLElement
    const selector = new Selection((() => wrapper.closest(`.${timeViewContainer}`) as HTMLDivElement), {})


    const handleMove = (point:IEventCoordinatesData, bounds:IBounds) => {
      if (!pointInColumn(bounds, point)) return handleReset()
      const { event, } = context.dragAndDropAction as IState
      const newSlot = slotMetrics.closestSlotFromPoint({
        y: point.y - eventOffsetTop,
        x: point.x,
      } as IEventCoordinatesData, bounds)
      const { duration, } = eventTimes(event as CalendarEvent)
      const newEnd = localizer.add(
        newSlot, duration, 'milliseconds'
      )
      handleUpdate(event as CalendarEvent, slotMetrics.getRange(newSlot, newEnd as Date))
    }
    const handleResize = (point:IEventCoordinatesData, bounds:IBounds) => {
      const direction  = context.dragAndDropAction?.direction as IDirection
      const event = context.dragAndDropAction?.event as CalendarEvent
      const newTime = slotMetrics.closestSlotFromPoint(point, bounds)
      const { start, end, } = eventTimes(event)
      let newRange
      if (direction  === 'UP') {
        const newStart = localizer.min(newTime, slotMetrics.closestSlotFromDate(end, -1))
        newRange = slotMetrics.getRange(newStart, end)
        newRange = {
          ...newRange, endDate: end,
        }
      } else if (direction  === 'DOWN') {
        const newEnd = localizer.max(newTime, slotMetrics.closestSlotFromDate(start))
        newRange = slotMetrics.getRange(start, newEnd)
        newRange = {
          ...newRange,
          setState: start,
        }
      }
      handleUpdate(event, newRange as IEventRangeResult)
    }










    selector.on('beforeSelect', (point:IEventCoordinatesData) => {
      const { dragAndDropAction, } = context
      if (!dragAndDropAction?.action) {
        return false
      }
      if (dragAndDropAction.action === 'resize') {
        return pointInColumn(getBoundsForNode(node) as IBounds, point)
      }
      const eventNode = getEventNodeFromPoint(node, point) as HTMLElement
      if (!eventNode) return false
      setEventOffsetTop(point.y - (getBoundsForNode(eventNode) as IBounds).top)
    })

    selector.on('selecting', (box:IEventCoordinatesData) => {
      const bounds = getBoundsForNode(node)
      const { dragAndDropAction, } = context
      if (dragAndDropAction?.action === 'move') {
        handleMove(box, bounds as IBounds)
      }
      if (dragAndDropAction?.action === 'resize') {
        handleResize(box, bounds as IBounds)
      }
    })
    selector.on('dropFromOutside', (point) => {
      console.log(point, 'dropFromOutside')
    })
    selector.on('dragOver', (point) => {
      console.log(point, 'dragOver')
    })
    selector.on('selectStart', () => {
      console.log('selectStart')
    })
    selector.on('select', (point) => {
      console.log(point, 'select')
    })
    selector.on('click', () => {
      console.log('click')
    })
    selector.on('reset', () => {
      console.log('reset')
    })
  }
  useEffect(() => {
    handleSelectable()
  }, [ref])

  const Content = () => {
    // 事件容器的子节点
    const events = (children as ReactElement).props.children
    return (
      React.cloneElement(children as ReactElement, {
        children: (
          <React.Fragment>
            {events}
          </React.Fragment>
        ),
      })
    )
  }
  return (
    <div ref={ref}>
      <Content />
    </div>
  )
}
