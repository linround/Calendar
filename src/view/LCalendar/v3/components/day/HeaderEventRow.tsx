import React, { Fragment } from 'react'
import { ISegments } from '../../../utils/segments/eventSegments'
import { CalendarTimestamp } from '../../../utils/calendar'
import { ROW_EVENT_HEIGHT } from '../../../utils/time'
import style from './style/headerEventRow.module.less'
import { RowSpan } from '../week/RowSpan'
import { HeaderRowEvent } from './HeaderRowEvent'

interface IProps {
  segments:ISegments[]
  slots:number
  days:CalendarTimestamp[]
  container:HTMLDivElement
}
export function HeaderEventRow(props:React.PropsWithChildren<IProps>) {
  const {
    segments,
    slots,
    days,
    container,
  } = props
  let lastEnd = 1
  return (
    <div
      className={style.headerEventRow}
      style={{ height: ROW_EVENT_HEIGHT, }}>
      {segments.map((seg, index) => {
        const { event, left, right, span, } = seg
        const gap = left - lastEnd
        lastEnd = right + 1
        return (<Fragment key={index}>
          {!!gap && (<RowSpan slots={slots} gap={gap} />)}
          <HeaderRowEvent
            slots={slots}
            span={span}
            event={event}
            container={container}
            days={days} />
        </Fragment>
        )
      })}
    </div>
  )
}
