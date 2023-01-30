import { WeekComponent } from './WeekComponent'
import monthStyle from './month.module.less'
import React from 'react'

export function MonthComponent() {
  return (
    <div className={monthStyle.monthBodyContainer}>
      <WeekComponent />
    </div>
  )
}
