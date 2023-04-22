import {
  eventsInSlot, getEventsInSot, ISegments
} from '../../../utils/segments/eventSegments'
import style from './style/rowMore.module.less'
import React, { useContext, useRef } from 'react'
import { RowMoreWrapper } from './RowMoreWrapper'
import { MouseEventContext } from '../../../props/propsContext'
import { CalendarTimestamp } from '../../../utils/calendar'

interface IProps {
  slots:number
  segments:ISegments[]
  slot:number
  rowSegments?:ISegments[]
  onMore?:(slot?:number)=>void
  dates?:CalendarTimestamp[]
  ClickWrapper?: React.Component
}
export function RowMore(props:IProps) {
  const {
    segments,
    slot, // 这周的第几天
    slots, //一周共有七天
    onMore,
    rowSegments,
    dates,
  } = props
  const width = ((1 / slots) * 100) + '%'
  const count = eventsInSlot(segments, slot)
  const {
    setMorePopoverRef,
    setMoreEvents,
    setMoreDate,
  } = useContext(MouseEventContext)
  const moreRef = useRef<HTMLDivElement>(null)
  const onClick = () => {
    onMore && onMore()
    if (onMore) {
      onMore()
    } else {
      const events = getEventsInSot(slot, rowSegments as ISegments[])
      setMorePopoverRef(moreRef.current)
      setMoreEvents(events)
      const times = dates as CalendarTimestamp[]
      const day = times[slot - 1]
      setMoreDate(day)

    }
  }
  return (
    <RowMoreWrapper>
      <div
        ref={moreRef}
        className={style.rowMore}
        style={{
          flexBasis: width,
          maxWidth: width,
        }}>
        <div
          onClick={onClick}
          className={style.rowMoreContent}>
          +
          <span className={style.rowMoreNumber}>
            {count} 更多
          </span>
        </div>
      </div>
    </RowMoreWrapper>
  )
}
