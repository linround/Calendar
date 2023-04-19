import {
  eventsInSlot, ISegments, isSegmentInSlot
} from '../../../utils/segments/eventSegments'
import { CalendarTimestamp } from '../../../utils/calendar'
import React from 'react'
import range from 'lodash/range'
import { RowSpan } from '../week/RowSpan'
import { HeaderRowEvent } from './HeaderRowEvent'
import { RowMore } from '../week/RowMore'
import { ROW_EVENT_HEIGHT } from '../../../utils/time'
import style from '../week/style/rowExtra.module.less'

interface IProps {
  segments:ISegments[]
  slots:number
  days:CalendarTimestamp[]
  setFold:React.Dispatch<React.SetStateAction<boolean>>
}
export function HeaderRowExtra(props:React.PropsWithChildren<IProps>) {
  const {
    segments,
    slots,
    days,
    setFold,
  } = props
  let current = 1
  let lastEnd = 1
  const row = []
  while (current <= slots) {
    const key = current
    const {
      event,
      left,
      right,
      span,
    } = segments.filter((seg) => isSegmentInSlot(seg, current))[0] || {}
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
    if (gap) {
      row.push(<RowSpan key={`${key}_gap`} slots={slots} gap={gap}/>)
    }
    if (canRenderSlotEvent) {
      row.push(<HeaderRowEvent
        key={key}
        slots={slots}
        event={event}
        days={days}
        span={span}
      />)
      current = right + 1
    } else {
      row.push(<RowMore
        key={key}
        onMore={setFold}
        slots={slots}
        segments={segments}
        slot={current}/>)
      current += 1
    }
    lastEnd = current
  }
  return (
    <div
      style={{
        height: ROW_EVENT_HEIGHT,
      }}
      className={style.rowExtra}>
      {row}
    </div>
  )
}
