import { WeekComponent } from './WeekComponent'
import monthStyle from './month.module.less'

export function MonthComponent(/**props: IMonthProps**/) {

  return (
    <div className={monthStyle.monthBodyContainer}>
      <WeekComponent />
    </div>
  )
}
