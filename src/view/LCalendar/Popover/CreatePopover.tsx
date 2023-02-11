import React, {
  useContext, useEffect, useMemo, useState
} from 'react'
import { EventContext, MouseEventContext } from '../props/propsContext'
import { POPOVER_WIDTH_DEF } from './helpers'
import styles from './createEventPopover.module.less'

export function CreatePopover() {
  const { showCreatePopover,
    popoverRef, } = useContext(MouseEventContext)
  const { events, } = useContext(EventContext)
  const createEvent = useMemo(() => events.filter((e) => e.isCreate), [events])
  const [left, setLeft] = useState('50%')
  const [top, setTop] = useState('50%')
  useEffect(() => {
    console.log('**')
    if (popoverRef) {
      const { left, top, } = popoverRef.getBoundingClientRect()
      setLeft(left + 'px')
      setTop(top + 'px')
      console.log(
        left, top, popoverRef
      )
    }
  }, [popoverRef?.getBoundingClientRect()])
  return (
    <>
      {
        (popoverRef && showCreatePopover) ?
          <div
            style={{
              left: `${left}`,
              top: `${top}`,
              width: `${POPOVER_WIDTH_DEF}px`,
            }}
            className={styles.createEventPopoverContainer}>
            CreatePopover
            {
              createEvent[0]?.name
            }
          </div> :
          ''
      }
    </>
  )
}
