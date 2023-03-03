import styles from './style.module.less'
import React from 'react'
import { CreateButton } from './CreateButton'
import { ISideAdd } from '../modules/options'
import { SimpleCalendar } from './SimpleCalendar'
import { SimpleController } from './SimpleController'
import { createCalendarGroup, ISimpleControllerProps } from './utils'
import { SearchComponent } from './SearchComponent'
import { CalendarGroups } from './CalendarGroups'

interface IProps extends ISideAdd, ISimpleControllerProps {}

export function SideComponent(props:IProps) {
  const calendarGroups = createCalendarGroup()
  return (
    <>
      <div className={styles.sideTitle}>
        U C a l e n d a r
      </div>
      <CreateButton {...props} />
      <SimpleController {...props} />
      <SimpleCalendar />
      <SearchComponent />
      <CalendarGroups calendarGroups={calendarGroups} type={0} name='我的日历' />
      <CalendarGroups calendarGroups={calendarGroups} type={1} name='其他日历' />
    </>
  )
}
