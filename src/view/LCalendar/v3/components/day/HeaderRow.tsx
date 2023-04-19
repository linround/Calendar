import { ISegments } from '../../../utils/segments/eventSegments'
import React from 'react'
import style from './style/headerRow.module.less'
import { HeaderEventRow } from './HeaderEventRow'
import { HeaderRowExtra } from './HeaderRowExtra'
import { CalendarTimestamp } from '../../../utils/calendar'

interface IProps {
  levels:ISegments[][]
  extra:ISegments[]
  slots:number
  days:CalendarTimestamp[]
}
export function HeaderRow(props:React.PropsWithChildren<IProps>) {
  const { levels, slots, extra, days, } = props
  return (
    <div
      style={{
        maxHeight: 180,
        overflowY: 'auto',
      }}
      className={style.headerRows}>
      <div>
        {levels.map((segs, index) => (
          <HeaderEventRow
            key={index}
            slots={slots}
            segments={segs}
            days={days}/>))}
        {!!extra.length && (
          <HeaderRowExtra
            slots={slots}
            segments={extra}
            days={days}
          />
        )}
      </div>
    </div>
  )
}
