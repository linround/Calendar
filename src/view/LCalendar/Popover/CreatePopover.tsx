import React, {
  useContext, useEffect, useMemo, useState
} from 'react'
import { EventContext, MouseEventContext } from '../props/propsContext'
import {
  POPOVER_WIDTH_DEF, IS_FULL_WIDTH, IS_HIGH_LEVEL
} from './helpers'
import styles from './createEventPopover.module.less'
const popoverCache:{ ref:Element | null} = {
  ref: null,
}

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
      createPopoverRef.classList.add(IS_HIGH_LEVEL, IS_FULL_WIDTH)
      popoverCache.ref = createPopoverRef
      // 这里无法在全局处理
      setLeft(left + 'px')
      setTop(top + 'px')
      return
    }
    popoverCache.ref = null

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
