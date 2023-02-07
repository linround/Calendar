import { ISegments } from '../utils/segments/eventSegments'
import React, { Fragment } from 'react'
import { EventRowMixin } from './EventRowMixin'
import eventRowStyle from './eventRow.module.less'
import { CalendarEvent, IMouseEvent } from '../utils/calendar'

interface IEventRow{
  segments: ISegments[]
  slots: number
  onMousedownEvent: (event:IMouseEvent) => IMouseEvent
  onClickEvent: (event:IMouseEvent) =>IMouseEvent
}
export function EventRow(props:React.PropsWithChildren<IEventRow>) {
  const { segments, slots, onMousedownEvent, onClickEvent, } = props
  let lastEnd = 1
  return (
    <div className={eventRowStyle.eventRowContainer}>
      {
        segments.map((seg, index) => {
          const { event, left, right, span, } = seg
          const gap = left - lastEnd
          const content = event.name
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
                  onClickEvent
                )
              }

            </Fragment>
          )

        })
      }
    </div>
  )
}
