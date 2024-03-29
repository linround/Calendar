import React, {
  createRef, ReactElement, useContext, useEffect, useRef, useState
} from 'react'
import { IEventRangeResult, ISlotMetrics } from '../utils/timeSlots'
import { timeViewContainer } from '../utils/day'
import {
  getBoundsForNode, getEventNodeFromPoint, IBounds, IEventCoordinatesData, Selection
} from '../utils/selection'
import { CalendarContext } from '../createContext'
import { IContextState, IDirection } from '../context'
import { eventTimes, pointInColumn } from '../utils/common'
import { CalendarEvent } from '../../utils/calendar'
import localizer from '../../utils/segments/localizer'
import { TimeGridEvent } from './TimeGridEvent'

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
  const ref = useRef<HTMLDivElement|null>(null)
  const [state, setState] = useState<IState>({})
  const context = useContext(CalendarContext)
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

  const handleMove = (point:IEventCoordinatesData, bounds:IBounds) => {
    if (!pointInColumn(bounds, point)) return handleReset()

    const { event, } = context.draggable.dragAndDropAction as IContextState

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
    const direction  = context.draggable.dragAndDropAction?.direction as IDirection
    const event = context.draggable.dragAndDropAction?.event as CalendarEvent
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
  const handleInteractionEnd = () => {
    const { event, } = state
    handleReset()
    context.draggable.onEnd && context.draggable.onEnd({
      start: event?.start,
      end: event?.end,
    })
  }

  const handleSelectable = ():void => {

    const wrapper = ref.current as HTMLDivElement
    const node = wrapper.children[0] as HTMLElement
    const selector = new Selection((() => wrapper.closest(`.${timeViewContainer}`) as HTMLDivElement), {})

    selector.on('beforeSelect', (point:IEventCoordinatesData) => {
      const { dragAndDropAction, } = context.draggable
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
      const { dragAndDropAction, } = context.draggable

      if (dragAndDropAction?.action === 'move') {
        handleMove(box, bounds as IBounds)
      }
      if (dragAndDropAction?.action === 'resize') {
        handleResize(box, bounds as IBounds)
      }
    })
    selector.on('dropFromOutside', () => {
      console.log('dropFromOutside')
    })
    selector.on('dragOver', () => {
      console.log('dragOver')
    })
    selector.on('selectStart', () => {
      setIsBeingDragged(true)
      context.draggable.onStart && context.draggable?.onStart()
    })
    selector.on('select', (point:IEventCoordinatesData) => {
      const bounds = getBoundsForNode(node)  as IBounds
      setIsBeingDragged(false)
      const { dragAndDropAction, } = context.draggable
      if (dragAndDropAction?.action === 'resize') {
        handleInteractionEnd()
      } else if (!state.event || pointInColumn(bounds, point)) {
        return
      } else {
        handleInteractionEnd()
      }
    })
    selector.on('click', () => {
      if (!isBeingDragged) {
        handleReset()
      }
      context.draggable.onEnd && context.draggable.onEnd(null)

    })
    selector.on('reset', () => {
      handleReset()
      context.draggable.onEnd && context.draggable.onEnd(null)
    })
  }
  useEffect(() => {
    handleSelectable()
  }, [ref])

  const renderContent = () => {
    // 事件容器的子节点
    const events = (children as ReactElement).props.children
    const { event, top = 0, height = 0, } = state
    return (
      React.cloneElement(children as ReactElement, {
        children: (
          <React.Fragment>
            {events}
            {event && (
              <TimeGridEvent
                event={event}
                style={{ top, height, width: 100, xOffset: 0, }}
                label='test'
              />
            ) }
          </React.Fragment>
        ),
      })
    )
  }
  return (
    <div ref={ref}>
      {renderContent()}
    </div>
  )
}
