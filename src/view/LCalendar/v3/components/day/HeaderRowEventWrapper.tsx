import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import React, {
  createRef, ReactElement, useContext, useLayoutEffect, useRef, useState
} from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { mousedownController } from '../../utils/mouseDown'
import { NORMAL_ACTION } from '../../utils'
import { EventContext, MouseEventContext } from '../../../props/propsContext'

interface IProps {
  event:CalendarEvent
  days:CalendarTimestamp[]
  container:HTMLDivElement
}
export function HeaderRowEventWrapper(props:React.PropsWithChildren<IProps>) {
  const {
    children,
    container,
    days,
    event,
  } = props
  const isCreate = event.isCreate
  const ref = createRef<HTMLDivElement>()
  const normalRef = useRef<Element|null>(null)
  const {
    updateEventList,
    setShowCreatePopoverV3,
    setCreatePopoverRefV3,
    setShowNormalPopover,
    setNormalEvent,
    setNormalPopoverRef,
  } = useContext(MouseEventContext)
  const {
    setDraggedEvent,
    setCreatedEvent,
  } = useContext(EventContext)

  function hideCreate() {
    setShowCreatePopoverV3(false)
  }
  function clearCreated() {
    setCreatedEvent(null)
    setCreatePopoverRefV3(null)
    setShowCreatePopoverV3(false)
  }
  function clearNormal() {
    setNormalEvent(null)
    setNormalPopoverRef(null)
    setShowNormalPopover(false)
  }


  let initTime:number
  let isClick:boolean
  let draggedEvent:CalendarEvent
  const [moving, setMoving] = useState(false)
  const containerRect = container?.getBoundingClientRect()
  const selector = new Selector()
  selector.on('beforeSelect', (coordinates:ICoordinates) => {
    mousedownController.setState(NORMAL_ACTION)
  })
  selector.on('selecting', (coordinates:ICoordinates) => {})
  selector.on('select', (coordinates:ICoordinates) => {
    mousedownController.clearState()
    !isCreate && clearCreated()
  })

  useLayoutEffect(() => {
    if (ref.current) {
      setCreatePopoverRefV3(ref.current)
    }
  }, [ref])
  return React.cloneElement(children as ReactElement, {
    ref: isCreate ? ref : normalRef,
    onMouseDown(e:React.MouseEvent) {
      selector.handleInitialEvent(e)
    },
  })
}
