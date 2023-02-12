import React, {
  useContext, useEffect, useMemo, useState
} from 'react'
import { EventContext, MouseEventContext } from '../props/propsContext'
import {
  POPOVER_WIDTH_DEF, IS_FULL_WIDTH, IS_HIGH_LEVEL, calcPosition
} from './helpers'
import styles from './createEventPopover.module.less'
const popoverCache:{ ref:Element | null} = {
  ref: null,
}

export function CreatePopover() {
  const { showCreatePopover,
    createPopoverRef, dayScrollRef, } = useContext(MouseEventContext)
  const { events, } = useContext(EventContext)
  const createEvent = useMemo(() => events.filter((e) => e.isCreate), [events])
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)


  useEffect(() => {
    if (createPopoverRef) {
      const { left, top, } = calcPosition(createPopoverRef, dayScrollRef as Element)
      popoverCache.ref = createPopoverRef
      // 这里无法在全局处理
      setLeft(Math.max(0, left))
      setTop(Math.max(0, top))
      return
    }



  }, [createPopoverRef?.getBoundingClientRect(), createPopoverRef])
  return (
    <>
      {
        (createPopoverRef && showCreatePopover) ?
          <div
            style={{
              left: `${left}px`,
              top: `${top}px`,
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
