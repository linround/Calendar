import { ISegments } from '../utils/segments/eventSegments'
import React, {
  Fragment, useContext, useEffect, useRef
} from 'react'
import { EventRowMixin } from './EventRowMixin'
import eventRowStyle from './eventRow.module.less'
import { IMouseEvent } from '../utils/calendar'
import { NO_NAME_EVENT_VALUE } from '../utils/time'
import { EventContext, MouseEventContext } from '../props/propsContext'

interface IEventRow{
  segments: ISegments[]
  slots: number
  onMousedownEvent: (event:IMouseEvent) => IMouseEvent
  onClickEvent: (event:IMouseEvent) =>IMouseEvent
}
export const EventRow = React.forwardRef((props:React.PropsWithChildren<IEventRow>) => {
  const { segments, slots, onMousedownEvent, onClickEvent, } = props
  let lastEnd = 1
  const ref = useRef<HTMLDivElement>(null)
  const {
    setCreatedEvent,

  } = useContext(EventContext)

  const {
    setShowCreatePopoverV3,
    setCreatePopoverRefV3,

    setShowNormalPopover,
    setNormalEvent,
    setNormalPopoverRef,
  } = useContext(MouseEventContext)

  useEffect(() => {
    if (ref.current) {
      setCreatePopoverRefV3(ref.current)
    }
  }, [ref.current])

  return (
    <div className={eventRowStyle.eventRowContainer}>
      {
        segments.map((seg, index) => {
          const { event, left, right, span, } = seg
          const gap = left - lastEnd
          const content = event.eventName || NO_NAME_EVENT_VALUE
          lastEnd = right + 1
          return (
            <Fragment key={index}>
              {
                !!gap && (
                  EventRowMixin.renderSpan(slots, gap)
                )
              }
              {
                EventRowMixin.renderEvent(
                  slots,
                  span,
                  content,
                  event,
                  onMousedownEvent,
                  onClickEvent,
                  ref

                )
              }

            </Fragment>
          )

        })
      }
    </div>
  )
})
