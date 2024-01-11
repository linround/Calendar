import { ISegments } from '../../../utils/segments/eventSegments'
import React from 'react'
import { HeaderEventRow } from './HeaderEventRow'
import { HeaderRowExtra } from './HeaderRowExtra'
import { CalendarTimestamp } from '../../../utils/calendar'
import dayStyle from '../../../components/day.module.less'
import classnames from 'classnames'
import style from './style/headerRow.module.less'
import { HeaderEventRowEditing } from './HeaderEventRowEditing'
import { useEditingEventsSegmentsInWeekAndDayHeaderHook } from '../../../props/useEventsHook'

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
  const { levels: editingLevels, } = useEditingEventsSegmentsInWeekAndDayHeaderHook(days)
  return (
    <div
      style={{
        maxHeight: 240,
        overflowY: 'scroll',
      }}
      className={className}>
      <div>
        {editingLevels.map((segs, index) => (
          <HeaderEventRowEditing key={index} slots={slots} segments={segs} container={container} days={days} />
        ))}
        {levels.map((segs, index) => (
          <HeaderEventRow
            key={index}
            slots={slots}
            segments={segs}
            container={container}
            days={days}/>))}
        {!!extra.length && (
          <HeaderRowExtra
            container={container}
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
