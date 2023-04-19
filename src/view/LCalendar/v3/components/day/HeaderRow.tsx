import { ISegments } from '../../../utils/segments/eventSegments'
import React, { useRef } from 'react'
import { HeaderEventRow } from './HeaderEventRow'
import { HeaderRowExtra } from './HeaderRowExtra'
import { CalendarTimestamp } from '../../../utils/calendar'
import dayStyle from '../../../components/day.module.less'
import classnames from 'classnames'
import style from './style/headerRow.module.less'
import { HeaderBodyWrapper } from './HeaderBodyWrapper'

interface IProps {
  levels:ISegments[][]
  extra:ISegments[]
  slots:number
  days:CalendarTimestamp[]
  fold:boolean
  onMore:()=>void
}
export function HeaderRow(props:React.PropsWithChildren<IProps>) {
  const {
    levels,
    slots,
    extra,
    days,
    onMore,
  } = props
  const className = classnames({
    [style.headerRows]: true,
    [dayStyle.scrollContainer]: true,
  })
  const container = useRef<HTMLDivElement>(null)
  return (
    <div
      style={{
        maxHeight: 240,
        overflowY: 'scroll',
      }}
      ref={container}
      className={className}>
      <HeaderBodyWrapper
        days={days}
        container={container.current as HTMLDivElement}>
        <div>
          {levels.map((segs, index) => (
            <HeaderEventRow
              key={index}
              slots={slots}
              segments={segs}
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
      </HeaderBodyWrapper>
    </div>
  )
}
