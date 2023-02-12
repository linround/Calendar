import styles from './normalEventPopover.module.less'
import React, {
  useContext, useEffect, useState
} from 'react'
import {  MouseEventContext } from '../props/propsContext'
import { PopoverContent } from './PopoverContent'
import { IS_HIGH_LEVEL, POPOVER_WIDTH_DEF } from './helpers'
import { CalendarEvent } from '../utils/calendar'
const popoverCache:{ref:Element|null} = {
  ref: null,
}

export function NormalPopover() {
  const [left, setLeft] = useState(100)
  const [top, setTop] = useState(100)
  const { showNormalPopover, normalEvent, normalPopoverRef, } = useContext(MouseEventContext)
  useEffect(() => {
    if (normalPopoverRef) {
      const { left, top, } = normalPopoverRef.getBoundingClientRect()
      // 之前如果有之前存储的ref
      // 移除前一个的class
      if (popoverCache.ref) {
        popoverCache.ref.classList.remove(IS_HIGH_LEVEL)
      }
      // 修改当前的ref
      popoverCache.ref = normalPopoverRef
      // 设置当前的
      popoverCache.ref.classList.add(IS_HIGH_LEVEL)
      setLeft(left)
      setTop(top)
    } else {
      // 如果是直接关闭popover
      // 需要移除ref上的class
      popoverCache.ref?.classList.remove(IS_HIGH_LEVEL)
      popoverCache.ref = null
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
