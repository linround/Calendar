import React, { useContext, useEffect } from 'react'
import { MouseEventContext } from '../props/propsContext'
import { POPOVER_WIDTH_DEF } from './helpers'
import styles from './style.module.less'

export function CreatePopover() {
  const { createPopoverEvent,
    showCreatePopover,
    createPopoverCoordinate, } = useContext(MouseEventContext)
  useEffect(() => {
    console.log(showCreatePopover, 'showCreatePopover')
  }, [showCreatePopover])
  return (
    <>
      {
        (createPopoverEvent && showCreatePopover) ?
          <div
            style={{
              left: `${createPopoverCoordinate[0]}px`,
              top: `${createPopoverCoordinate[1]}px`,
              width: `${POPOVER_WIDTH_DEF}px`,
            }}
            className={styles.popoverContainer}>
            CreatePopover
          </div> :
          ''
      }
    </>
  )
}
