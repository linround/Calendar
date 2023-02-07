import {
  eventLevels, eventsInSlot, ISegments, isSegmentInSlot
} from '../utils/segments/eventSegments'
import React, { Fragment } from 'react'
import range from 'lodash/range'
import { EventRowMixin } from './EventRowMixin'
import eventRowStyle from './eventRow.module.less'
import { defaultShowMore } from './type'

interface IEventRow{
  segments: ISegments[]
  slots: number|string
  showMore: (slot: number, e:React.MouseEvent) => void
}
export function EventRowEnd(props:React.PropsWithChildren<IEventRow>) {
  const { segments, slots, showMore = defaultShowMore,  } = props
  // const rowSegments = eventLevels(segments).levels[0]
  let current = 1
  let lastEnd = 1
  const row = []
  while (current <= slots) {
    const key = `row_end_${current}`
    const { event, left, right, span, } = segments.filter((seg) => isSegmentInSlot(seg, current))[0] || {}

    if (!event) {
      current += 1
      continue
    }
    const gap = Math.max(0, left - lastEnd)
    const canRenderSlotEvent = range(left, left + span)
      .every((s:number) => {
        const count = eventsInSlot(segments, s)
        return count === 1
      })
    if (canRenderSlotEvent) {
      const content =  event.name
      if (gap) {
        row.push(<Fragment key={`${key}_gap`}>
          {
            EventRowMixin.renderSpan((slots as number), gap)
          }
        </Fragment>)
      }
      row.push(<Fragment key={key}>
        {
          EventRowMixin.renderEvent(
            (slots as number), span, content, event
          )
        }
      </Fragment>)

      current = right + 1
      lastEnd = current
    } else {
      if (gap) {
        row.push(<Fragment key={`${key}_gap`}>
          {
            EventRowMixin.renderSpan(slots as number, gap)
          }
        </Fragment>)
      }
      row.push(<Fragment key={key}>
        {
          EventRowMixin.renderMore(
            slots as number,
            1,
            EventRowMixin.renderMoreContent(
              segments, current, showMore
            )
          )
        }
      </Fragment>)
    }
    current += 1
    lastEnd = current
  }

  return (
    <div className={eventRowStyle.eventRowContainer}>
      {row}
    </div>
  )

}
