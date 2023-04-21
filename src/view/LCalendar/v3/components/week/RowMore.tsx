import { eventsInSlot, ISegments } from '../../../utils/segments/eventSegments'
import style from './style/rowMore.module.less'
import React from 'react'

interface IProps {
  slots:number
  segments:ISegments[]
  slot:number
  onMore:(slot?:number)=>void
}
export function RowMore(props:IProps) {
  const {
    segments,
    slot,
    slots,
    onMore,
  } = props
  const width = ((1 / slots) * 100) + '%'
  const count = eventsInSlot(segments, slot)
  const onClick = () => {
    onMore && onMore(slot)
  }
  return (
    <div
      className={style.rowMore}
      onMouseDown={onClick}
      style={{
        flexBasis: width,
        maxWidth: width,
      }}>
      <div
        className={style.rowMoreContent}>
        +
        <span className={style.rowMoreNumber}>
          {count} 更多
        </span>
      </div>
    </div>
  )
}
