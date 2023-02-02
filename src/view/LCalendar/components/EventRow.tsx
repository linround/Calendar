import { ISegments } from '../utils/segments/eventSegments'
import React, { Fragment } from 'react'
import { EventRowMixin } from './EventRowMixin'
import eventRowStyle from './eventRow.module.less'

interface IEventRow{
  segments: ISegments[]
}
export function EventRow(props:React.PropsWithChildren<IEventRow>) {
  const { segments, } = props
  let lastEnd = 1
  return (
    <div className={eventRowStyle.eventRowContainer}>
      {
        segments.map((seg, index) => {
          const { event, left, right, span, } = seg
          const gap = left - lastEnd
          const content = event.title
          lastEnd = right + 1
          return (
            <Fragment key={index}>
              {
                !!gap && (
                  EventRowMixin.renderSpan(7, gap)
                )
              }
              {
                EventRowMixin.renderEvent(
                  7, span,  content, event
                )
              }

            </Fragment>
          )

        })
      }
    </div>
  )
}
