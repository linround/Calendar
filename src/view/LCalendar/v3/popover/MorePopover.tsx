import {
  useContext, useEffect, useRef, useState
} from 'react'
import { MouseEventContext } from '../../props/propsContext'
import commonStyle from '../../commonStyle/popover.module.less'
import style from './style/morePopover.module.less'
import classnames from 'classnames'
import { calcPosition } from '../../Popover/helpers'

export function MorePopover() {
  const {
    morePopoverRef,
    moreEvents,
  } = useContext(MouseEventContext)
  const eventRef = useRef<HTMLDivElement>(null)
  const className = classnames({
    [commonStyle.popover]: true,
    [style.popoverContainer]: true,
  })
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  useEffect(() => {
    if (morePopoverRef && eventRef.current) {
      const { left, top, } = calcPosition(
        morePopoverRef, document.body, eventRef.current
      )
      setLeft(Math.max(0, left))
      setTop(Math.max(0, top))
    }
  }, [morePopoverRef?.getBoundingClientRect(), eventRef.current])


  return (
    <>
      {morePopoverRef && (
        <div
          style={{ top, left, }}
          ref={eventRef}
          className={className}>
          {moreEvents.map((event, index) => (
            <div key={index}>{event.start}</div>
          ))}
        </div>
      )}
    </>
  )
}
