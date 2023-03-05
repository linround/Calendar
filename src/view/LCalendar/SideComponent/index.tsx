import styles from './style.module.less'
import React, { useContext, useState } from 'react'
import { CreateButton } from './CreateButton'
import { ISideAdd } from '../modules/options'
import { SimpleCalendar } from './SimpleCalendar'
import { SimpleController } from './SimpleController'
import { ISimpleControllerProps } from './utils'
import { SearchComponent } from './SearchComponent'
import { CalendarGroups } from './CalendarGroups'
import { CalendarContext } from '../props/propsContext'

interface IProps extends ISideAdd, ISimpleControllerProps {}

export function SideComponent(props:IProps) {
  const { groups, setChecks, checks, setGroups, } = useContext(CalendarContext)

  return (
    <>
      <div className={styles.sideTitle}>
        U C a l e n d a r
      </div>
      <CreateButton {...props} />
      <SimpleController {...props} />
      <SimpleCalendar />
      <SearchComponent />
      <CalendarGroups
        groups={groups}
        setChecks={setChecks}
        checks={checks}
        type={0}
        setGroups={setGroups}
        name='我的日历' />
      <CalendarGroups
        groups={groups}
        setChecks={setChecks}
        checks={checks}
        type={1}
        setGroups={setGroups}
        name='订阅日历' />
    </>
  )
}
