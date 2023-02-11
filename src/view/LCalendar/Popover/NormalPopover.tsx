import styles from './normalEventPopover.module.less'
import React, {
  useContext, useEffect, useState
} from 'react'
import {  MouseEventContext } from '../props/propsContext'
import { PopoverContent } from './PopoverContent'
import { POPOVER_WIDTH_DEF } from './helpers'
import { CalendarEvent } from '../utils/calendar'


export function NormalPopover() {
  const [left, setLeft] = useState(100)
  const [top, setTop] = useState(100)
  const { showNormalPopover, normalEvent, normalPopoverRef, } = useContext(MouseEventContext)
  useEffect(() => {
    if (normalPopoverRef) {
      const { left, top, } = normalPopoverRef.getBoundingClientRect()
      setLeft(left)
      setTop(top)
    }
  }, [normalPopoverRef])




  return (
    <>
      {
        (showNormalPopover && normalPopoverRef) ?
          <div
            style={{
              top: `${top}px`,
              left: `${left}px`,
              width: `${POPOVER_WIDTH_DEF}px`,
            }}
            className={styles.popoverContainer}>
            <PopoverContent event={normalEvent as CalendarEvent} /></div> :
          ''
      }
    </>
  )
}
