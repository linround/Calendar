import {
  useContext, useEffect, useRef, useState
} from 'react'
import { MouseEventContext } from '../../props/propsContext'
import commonStyle from '../../commonStyle/popover.module.less'
import style from './style/morePopover.module.less'
import classnames from 'classnames'
import { calcMoreContainer } from '../../Popover/helpers'
import dayStyle from '../../components/day.module.less'
import { moreEventItemLabel } from '../utils/event'

export function MorePopover() {
  const {
    morePopoverRef,
    moreEvents,
    moreDate,
  } = useContext(MouseEventContext)
  const eventRef = useRef<HTMLDivElement>(null)

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

  const className = classnames({
    [commonStyle.popover]: true,
    [style.popoverContainer]: true,
  })
  const eventsClassName = classnames({
    [style.popoverEvents]: true,
    [dayStyle.scrollContainer]: true,
  })
  return (
    <>
      {morePopoverRef && (<div>
        <div style={{ top, left, width, }}
          ref={eventRef}
          className={className}>
          <div className={style.popoverDate}>
            <span className={style.popoverDateText}>
              {moreDate?.day}
            </span>
          </div>
          <div className={eventsClassName}>
            {moreEvents.map((event, index) => (
              <div
                key={index}
                style={{
                  color: 'white',
                  backgroundColor: event.eventColor,
                }}
                className={style.popoverEvent}>
                {moreEventItemLabel(event)}
              </div>
            ))}
          </div>
        </div>
      </div>)}
    </>
  )
}
