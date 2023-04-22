import {
  useContext, useEffect, useRef, useState
} from 'react'
import { MouseEventContext } from '../../props/propsContext'
import commonStyle from '../../commonStyle/popover.module.less'
import style from './style/morePopover.module.less'
import classnames from 'classnames'
import { calcMoreContainer } from '../../Popover/helpers'
import dayStyle from '../../components/day.module.less'

export function MorePopover() {
  const {
    morePopoverRef,
    moreEvents,
  } = useContext(MouseEventContext)
  const eventRef = useRef<HTMLDivElement>(null)
  const className = classnames({
    [commonStyle.popover]: true,
    [style.popoverContainer]: true,
    [dayStyle.scrollContainer]: true,
  })
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (morePopoverRef && eventRef.current) {
      const { left, width, top, } = calcMoreContainer(morePopoverRef)
      setLeft(Math.max(0, left))
      setTop(Math.max(0, top))
      setWidth(width)
    }
  }, [morePopoverRef?.getBoundingClientRect(), eventRef.current])


  return (
    <>
      {morePopoverRef && (
        <div
          style={{ top, left, width, }}
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
