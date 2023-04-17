import { ISegments } from '../../../utils/segments/eventSegments'
import { RowSpan } from './RowSpan'
import { RowEvent } from './RowEvent'
import { Fragment } from 'react'
import style from './style/eventRow.module.less'
import { ROW_EVENT_HEIGHT } from '../../../utils/time'

interface IProps {
  segments:ISegments[]
  slots:number
}
export function EventRow(props:IProps) {
  const { segments, slots, } = props
  let lastEnd = 1
  return (
    <div
      style={{ height: ROW_EVENT_HEIGHT, }}
      className={style.eventRow}>
      {segments.map((seg, index) => {
        const { event, left, right, span, } = seg
        const gap = left - lastEnd
        lastEnd = right + 1
        return (<Fragment key={index}>
          {!!gap && (
            <RowSpan slots={slots} gap={gap} />
          )}
          <RowEvent
            event={event}
            slots={slots}
            span={span}
          />
        </Fragment>)
      })}
    </div>
  )
}
