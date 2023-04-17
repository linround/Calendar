import {
  eventsInSlot, ISegments, isSegmentInSlot
} from '../../../utils/segments/eventSegments'

import range from 'lodash/range'
import style from './style/rowExtra.module.less'
import { RowSpan } from './RowSpan'
import { RowEvent } from './RowEvent'
import { RowMore } from './RowMore'
import { ROW_EVENT_HEIGHT } from '../../../utils/time'
import { IMonth } from '../../../components/type'

interface IProps {
  segments:ISegments[]
  slots:number
  container:HTMLDivElement
  month:IMonth
}
export function RowExtra(props:IProps) {
  const {
    segments,
    slots,
    container,
    month,
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
      row.push(<RowSpan key={`${key}_gap`} slots={slots} gap={gap} />)
    }
    if (canRenderSlotEvent) {
      row.push(<RowEvent
        key={key}
        slots={slots}
        span={span}
        event={event}
        month={month}
        container={container}
      />)
      current = right + 1
    } else {
      row.push(<RowMore key={key} slots={slots} segments={segments} slot={current} />)
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
