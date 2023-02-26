import styles from './normalEventPopover.module.less'
import React, {
  useContext, useEffect, useState
} from 'react'
import {  MouseEventContext } from '../props/propsContext'
import { PopoverContent } from './PopoverContent'
import {
  IS_HIGH_LEVEL, POPOVER_WIDTH_DEF, calcPosition
} from './helpers'
import { CalendarEvent } from '../utils/calendar'
import { deleteEvent } from '../../../api/event'
import { SUCCESS_CODE } from '../../../request'
const popoverCache:{ref:Element|null} = {
  ref: null,
}

export function NormalPopover() {
  const [left, setLeft] = useState(100)
  const [top, setTop] = useState(100)
  const { clearPagePopover, updateEventList, } = useContext(MouseEventContext)
  const { showNormalPopover, normalEvent, normalPopoverRef, dayScrollRef, } = useContext(MouseEventContext)
  useEffect(() => {
    if (normalPopoverRef) {
      const { left, top, } = calcPosition(normalPopoverRef, dayScrollRef as Element)
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
  async function handleDeleteEvent(e:CalendarEvent) {
    const { code, } = await deleteEvent(e)
    if (code === SUCCESS_CODE) {
      console.log('删除成功')
      clearPagePopover()
      updateEventList()
    }
  }



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
            <PopoverContent
              event={normalEvent as CalendarEvent}
              deleteEvent={handleDeleteEvent}
            /></div> :
          ''
      }
    </>
  )
}
