import React, {
  useContext, useEffect, useMemo, useState
} from 'react'
import { EventContext, MouseEventContext } from '../props/propsContext'
import { POPOVER_WIDTH_DEF } from './helpers'
import styles from './createEventPopover.module.less'
import { IS_FULL_WIDTH } from './helpers'

export function CreatePopover() {
  const { showCreatePopover,
    createPopoverRef, } = useContext(MouseEventContext)
  const { events, } = useContext(EventContext)
  const createEvent = useMemo(() => events.filter((e) => e.isCreate), [events])
  const [left, setLeft] = useState('50%')
  const [top, setTop] = useState('50%')


  useEffect(() => {
    if (createPopoverRef) {
      const { left, top, } = createPopoverRef.getBoundingClientRect()
      setLeft(left + 'px')
      setTop(top + 'px')
    }
  }, [createPopoverRef?.getBoundingClientRect()])
  return (
    <>
      {
        (createPopoverRef && showCreatePopover) ?
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
