import { CalendarEvent, CalendarTimestamp } from '../../../utils/calendar'
import React, {
  createRef, ReactElement, useContext, useLayoutEffect, useRef, useState
} from 'react'
import { Selector } from '../../utils/selector'
import { ICoordinates } from '../../../v2/utils/selection'
import { mousedownController } from '../../utils/mouseDown'
import { NORMAL_ACTION } from '../../utils'
import { EventContext, MouseEventContext } from '../../../props/propsContext'
import { getDayTimeFromDaysPoint } from '../../utils/point'
import { toTime } from '../../../utils/timesStamp'
import { updateEvent } from '../../../../../api'
import { SUCCESS_CODE } from '../../../../../request'
import classnames from 'classnames'
import style from './style/eventWrapper.module.less'

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
    !isCreate && clearCreated()
    const timestamp = getDayTimeFromDaysPoint(
      containerRect, days, coordinates
    )
    draggedEvent = {
      ...event,
    }
    initTime = toTime(timestamp)
    isClick = true

    //  false表示不阻止添加mousemove 和mouseup相关事件
    return false
  })
  selector.on('selecting', (coordinates:ICoordinates) => {
    const timestamp = getDayTimeFromDaysPoint(
      containerRect, days, coordinates
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
    if (!isCreate) clearNormal()
    hideCreate()
    setDraggedEvent(draggedEvent)
  })
  selector.on('select', async (coordinates:ICoordinates) => {
    if (!isCreate) {
      if (isClick) {
        setNormalEvent(event)
        setNormalPopoverRef(normalRef.current)
        setShowNormalPopover(true)
      } else {
        const { code, } = await updateEvent(draggedEvent)
        if (code === SUCCESS_CODE) {
          setDraggedEvent(null)
          updateEventList()
        }
      }

    } else {
      setCreatedEvent(draggedEvent)
      setDraggedEvent(null)
      setShowCreatePopoverV3(true)
    }
    setMoving(false)
    mousedownController.clearState()


  })

  useLayoutEffect(() => {
    if (ref.current) {
      setCreatePopoverRefV3(ref.current)
    }
  }, [ref])


  const className = classnames({
    [(props.children as ReactElement)?.props.className]: true,
    [style.moving]: moving,
  })
  return React.cloneElement(children as ReactElement, {
    ref: isCreate ? ref : normalRef,
    className,
    onMouseDown(e:React.MouseEvent) {
      selector.handleInitialEvent(e)
    },
  })
}
