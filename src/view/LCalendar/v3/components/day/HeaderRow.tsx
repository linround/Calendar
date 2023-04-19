import { ISegments } from '../../../utils/segments/eventSegments'
import React from 'react'
import { HeaderEventRow } from './HeaderEventRow'
import { HeaderRowExtra } from './HeaderRowExtra'
import { CalendarTimestamp } from '../../../utils/calendar'
import dayStyle from '../../../components/day.module.less'
import classnames from 'classnames'
import style from './style/headerRow.module.less'

interface IProps {
  levels:ISegments[][]
  extra:ISegments[]
  slots:number
  days:CalendarTimestamp[]
  fold:boolean
  onMore:()=>void
  container:HTMLDivElement
}
export function HeaderRow(props:React.PropsWithChildren<IProps>) {
  const {
    levels,
    slots,
    extra,
    days,
    onMore,
    container,
  } = props
  const className = classnames({
    [style.headerRows]: true,
    [dayStyle.scrollContainer]: true,
  })

  return (
    <div
      style={{
        maxHeight: 240,
        overflowY: 'scroll',
      }}
      className={className}>
      <div>
        {levels.map((segs, index) => (
          <HeaderEventRow
            key={index}
            slots={slots}
            segments={segs}
            container={container}
            days={days}/>))}
        {!!extra.length && (
          <HeaderRowExtra
            onMore={onMore}
            slots={slots}
            segments={extra}
            days={days}
          />
        )}
      </div>
    </div>
  )
}
