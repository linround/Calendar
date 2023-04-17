import React, { useContext } from 'react'
import { mousedownController } from '../utils/mouseDown'
import {
  CalendarContext, EventContext, MouseEventContext
} from '../../props/propsContext'

export function CalendarContainer(props:React.PropsWithChildren) {
  const {
    setShowCreatePopoverV3,
    setNormalPopoverRef,
    setNormalEvent,
    setCreatePopoverRefV3,
    setShowNormalPopover,
  } = useContext(MouseEventContext)
  const { setCreatedEvent, } = useContext(EventContext)

  const { setAccountRef, setAddCalendarRef, } = useContext(CalendarContext)
  function clearCreatePopover() {
    setCreatePopoverRefV3(null)
    setCreatedEvent(null)
    setShowCreatePopoverV3(false)
  }
  function clearNormalPopover() {
    setNormalEvent(null)
    setNormalPopoverRef(null)
    setShowNormalPopover(false)
  }
  function clearAccountRef() {
    setAccountRef(null)
  }
  function clearAddCalendarRef() {
    setAddCalendarRef(null)
  }
  return React.cloneElement(props.children as React.ReactElement, {
    onMouseDown() {
      if (mousedownController.action === '') {
        clearCreatePopover()
        clearNormalPopover()
      }
      clearAccountRef()
      clearAddCalendarRef()
    },
  })
}
