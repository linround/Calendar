import { eventsInSlot, ISegments } from '../../../utils/segments/eventSegments'
import style from './style/rowMore.module.less'
import React from 'react'

interface IProps {
  slots:number
  segments:ISegments[]
  slot:number
  onMore:React.Dispatch<React.SetStateAction<boolean>>
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
    onMore(true)
  }
  return (
    <div
      className={style.rowMore}
      onClick={onClick}
      style={{
        flexBasis: width,
        maxWidth: width,
      }}>
      <div
        className={style.rowMoreContent}>
        +{count}更多
      </div>
    </div>
  )
}
