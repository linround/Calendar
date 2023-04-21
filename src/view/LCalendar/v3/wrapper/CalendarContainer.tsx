import React, {
  useCallback, useContext, useRef
} from 'react'
import { mousedownController } from '../utils/mouseDown'
import {
  CalendarContext, EventContext, MouseEventContext
} from '../../props/propsContext'


// 使用优化React.memo,避免props变化造成的重复渲染

export const CalendarContainer = React.memo((props: React.PropsWithChildren) => {
  const {
    setShowCreatePopoverV3,
    setNormalPopoverRef,
    setNormalEvent,
    setCreatePopoverRefV3,
    setShowNormalPopover,
  } = useContext(MouseEventContext)
  const { setCreatedEvent, } = useContext(EventContext)
  const { setAccountRef, setAddCalendarRef, } = useContext(CalendarContext)

  const clearCreatePopover = useCallback(() => {
    setCreatePopoverRefV3(null)
    setCreatedEvent(null)
    setShowCreatePopoverV3(false)
  }, [setCreatePopoverRefV3, setCreatedEvent, setShowCreatePopoverV3])

  const clearNormalPopover = useCallback(() => {
    setNormalEvent(null)
    setNormalPopoverRef(null)
    setShowNormalPopover(false)
  }, [setNormalEvent, setNormalPopoverRef, setShowNormalPopover])

  const clearAccountRef = useCallback(() => {
    setAccountRef(null)
  }, [setAccountRef])

  const clearAddCalendarRef = useCallback(() => {
    setAddCalendarRef(null)
  }, [setAddCalendarRef])

  const childrenRef = useRef<React.ReactElement>()

  return React.cloneElement(props.children as React.ReactElement, {
    ref: childrenRef,
    onMouseDown() {
      if (mousedownController.action === '') {
        clearCreatePopover()
        clearNormalPopover()
      }
      clearAccountRef()
      clearAddCalendarRef()
    },
  })
})
