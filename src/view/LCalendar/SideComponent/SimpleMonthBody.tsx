import React from 'react'
import { IMonth } from '../components/type'
import simpleStyles from './styleSimpleMonth.module.less'
import classnames from 'classnames'

interface IProps {
  month:IMonth
}

export function SimpleMonthBody(props:React.PropsWithChildren<IProps>) {
  const { month, } = props
  const dayClassName = classnames({
    [simpleStyles.containerDay]: true,
  })
  return (
    <div className={simpleStyles.containerMonth}>
      {
        month.map((week) => (
          <div className={simpleStyles.containerWeek}>
            {week.map((day) => (
              <div className={dayClassName}>
                {day.day.day}
              </div>
            ))}
          </div>
        ))
      }
    </div>
  )
}
