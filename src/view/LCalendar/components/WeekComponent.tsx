import React from 'react'
import { IMonthWeek, IWeekSegments } from './type'
import { GenSingleDay } from './GenSingleDay'
import monthStyle from './month.module.less'
import { EventRow } from './EventRow'
import { EventRowEnd } from './EventRowEnd'

interface IWeekComponent  {
  weekSegments: IWeekSegments
  weekDays:IMonthWeek
}


export function WeekComponent(props:React.PropsWithChildren<IWeekComponent >) {
  const { weekSegments, weekDays, } = props
  const { levels, extra, slots, } = weekSegments
  return (
    <div
      className={monthStyle.monthWeekContainer}>
      <div className={monthStyle.monthModal}>
        {
          weekDays.map((d, index) => (
            <div
              className={monthStyle.monthModalItem}
              key={index}></div>
          ))
        }
      </div>
      <div className={monthStyle.monthWeekRowHead}>
        {weekDays.map((day, index) => (<GenSingleDay day={day} key={index} />))}
      </div>
      <div className={monthStyle.monthWeekRowEvents}>
        {
          levels.map((segs, index) => (
            <EventRow segments={segs} key={index} />
          ))
        }
        {
          !!extra.length && (
            <EventRowEnd segments={extra} slots={slots} />
          )
        }
      </div>
    </div>
  )
}





