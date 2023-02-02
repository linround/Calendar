import { ISegments } from '../utils/segments/eventSegments'
import React from 'react'
import eventRowStyle from './eventRow.module.less'

interface IEventRow{
  segments: ISegments[]
}
export function EventRow(props:React.PropsWithChildren<IEventRow>) {
  const { segments, } = props
  const lastEnd = 1
  return (
    <div className={eventRowStyle.eventRowContainer}>
      {
        segments.map((seg) => {
          const { event, left, right, span, } = seg
          const gap = left - lastEnd
          const content = event.title
          return <div>{content}</div>
        })
      }
    </div>
  )
}
