import styles from './normalEventPopover.module.less'
import React, {
  createRef, useContext, useEffect, useState
} from 'react'
import { MouseEventContext } from '../props/propsContext'
import { PopoverContent } from './PopoverContent'
import { calcPosition, IS_HIGH_LEVEL } from './helpers'
import { CalendarEvent } from '../utils/calendar'
import { deleteEvent } from '../../../api/event'
import { SUCCESS_CODE } from '../../../request'
import classnames from 'classnames'
import commonPopoverStyle from '../commonStyle/popover.module.less'

const popoverCache:{ref:Element|null} = {
  ref: null,
}

export function NormalPopover() {
  const [left, setLeft] = useState(100)
  const [top, setTop] = useState(100)
  const { clearPagePopover, updateEventList, } = useContext(MouseEventContext)
  const { showNormalPopover, normalEvent, normalPopoverRef, dayScrollRef, } = useContext(MouseEventContext)
  const eventRef = createRef()

  useEffect(() => {
    if (normalPopoverRef && eventRef.current) {
      const { left, top, } = calcPosition(
        normalPopoverRef, dayScrollRef as Element, eventRef.current as Element
      )
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
  }, [normalPopoverRef, eventRef.current])


  async function handleDeleteEvent(e:CalendarEvent) {
    const { code, } = await deleteEvent(e)
    if (code === SUCCESS_CODE) {
      clearPagePopover()
      updateEventList()
    }
  }


  const className = classnames({
    [styles.popoverContainer]: true,
    [commonPopoverStyle.popover]: true,
  })
  return (
    <>
      {
        (showNormalPopover && normalPopoverRef) ?
          <div
            ref={eventRef as React.ForwardedRef<HTMLDivElement>}
            style={{
              top: top,
              left: left,
            }}
            className={className}>
            <PopoverContent
              event={normalEvent as CalendarEvent}
              deleteEvent={handleDeleteEvent} />
          </div> :
          ''
      }
    </>
  )
}
