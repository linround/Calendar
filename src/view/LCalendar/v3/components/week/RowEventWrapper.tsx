import React, {
  createRef, ReactElement, useContext, useEffect, useState
} from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { EventContext, MouseEventContext } from '../../../props/propsContext'
import { CalendarEvent } from '../../../utils/calendar'
import { mousedownController } from '../../utils/mouseDown'
import { NORMAL_ACTION } from '../../utils'
import { IMonth } from '../../../components/type'
import { getDayTimeFromPoint } from '../../utils/point'
import { toTime } from '../../../utils/timesStamp'
import classnames from 'classnames'
import style from '../day/style/eventWrapper.module.less'

interface IProps {
  event:CalendarEvent
  container:HTMLDivElement
  month:IMonth
}
export function RowEventWrapper(props:React.PropsWithChildren<IProps>) {
  const { children, event, container, month, } = props
  const isCreate = event.isCreate
  const ref = createRef<HTMLDivElement>()
  const {
    setCreatePopoverRefV3,
  } = useContext(MouseEventContext)
  const {
    setDraggedEvent,
  } = useContext(EventContext)
  useEffect(() => {
    if (ref.current) {
      setCreatePopoverRefV3(ref.current)
    }
  }, [ref])



  const [moving, setMoving] = useState(false)
  const containerRect = container?.getBoundingClientRect()
  const selector = new Selector()
  let initTime:number
  let isClick:boolean
  let draggedEvent:CalendarEvent

  selector.on('beforeSelect', (data:ICoordinates) => {
    mousedownController.setState(NORMAL_ACTION)
    const timestamp = getDayTimeFromPoint(
      containerRect, month, data
    )
    draggedEvent = {
      ...event,
    }

    initTime = toTime(timestamp)
    isClick = true
    return false
  })
  selector.on('selecting', (data:ICoordinates) => {
    const timestamp = getDayTimeFromPoint(
      containerRect, month, data
    )
    const time = toTime(timestamp)
    const duration = event.end - event.start
    const newStart = time - initTime + event.start
    const newEnd = newStart + duration
    draggedEvent = {
      ...event,
      start: newStart,
      end: newEnd,
      isDragging: true,
    }
    isClick = false
    setMoving(true)
    setDraggedEvent(draggedEvent)
  })
  selector.on('select', (data:ICoordinates) => {
    console.log(data)
    setMoving(false)
    mousedownController.clearState()
  })
  const className = classnames({
    [(props.children as ReactElement)?.props.className]: true,
    [style.moving]: moving,
  })
  return React.cloneElement(children as ReactElement, {
    ref: isCreate ? ref : null,
    className: className,
    onMouseDown(e:React.MouseEvent) {
      selector.handleInitialEvent(e)
    },
  })
}
