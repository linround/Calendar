import React, { useContext } from 'react'
import { IMonth } from '../components/type'
import simpleStyles from './styleSimpleMonth.module.less'
import classnames from 'classnames'
import { BaseContext, CalendarContext } from '../props/propsContext'
import { isActiveDay } from './utils'
import { CalendarTimestamp } from '../utils/calendar'
import { timestampToDate } from '../utils/timesStamp'

interface IProps {
  month:IMonth
}

export function SimpleMonthBody(props:React.PropsWithChildren<IProps>) {
  const { month, } = props
  const { parsedValue,  } = useContext(BaseContext)
  const {  setValue, } = useContext(CalendarContext)
  return (
    <div className={simpleStyles.containerMonth}>
      {
        month.map((week, weekIndex) => (
          <div key={weekIndex} className={simpleStyles.containerWeek}>
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                onClick={() => setValue(timestampToDate(day.day))}
                className={classnames({
                  [simpleStyles.containerDay]: true,
                  [simpleStyles.containerDayNormal]: !isActiveDay(day, parsedValue as CalendarTimestamp),
                  [simpleStyles.containerDayActive]: isActiveDay(day, parsedValue as CalendarTimestamp),
                })}>
                {day.day.day}
              </div>
            ))}
          </div>
        ))
      }
    </div>
  )
}
