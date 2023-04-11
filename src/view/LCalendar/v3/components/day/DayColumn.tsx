import React from 'react'
import {
  CalendarDayBodySlotScope,
  CalendarEventParsed,
  CalendarTimestamp
} from '../../../utils/calendar'
import classnames from 'classnames'
import { EventComponent } from './Event'
import style from './style/dayColumn.module.less'
import { DEFAULT_EVENT } from '../../../props/propsContext'
import { V3DayColumnWrapperComponent } from './DayColumnWrapper'
interface IProps {
  intervals:CalendarTimestamp[][]
  intervalWidth:number
  intervalHeight:number
  days:CalendarTimestamp[]
  events:CalendarEventParsed[]
  getSlotScope: (timestamp: CalendarTimestamp)=> CalendarDayBodySlotScope
}
export function V3DayColumnComponent(props:React.PropsWithChildren<IProps>) {
  const {
    intervals,
    intervalHeight,
    days,
    events,
    getSlotScope,
  } = props
  const dayInterval = intervals[0] || []

  return (
    <>
      {days.map((day, idx) => (
        <V3DayColumnWrapperComponent key={idx}>
          <div className={classnames({
            [style.dayBody]: true,
            [DEFAULT_EVENT.eventViewContainer]: true,
          })}>
            {dayInterval.map((interval, index) => (
              <div className={style.dayBodyInterval}
                style={{ height: intervalHeight, }}
                key={index} />))}

            <div className={style.dayEvents}>
              <EventComponent events={events} day={day} getSlotScope={getSlotScope}  />
            </div>
          </div>
        </V3DayColumnWrapperComponent>))}
    </>

  )
}
