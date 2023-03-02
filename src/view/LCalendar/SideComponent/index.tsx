import styles from './style.module.less'
import React from 'react'
import { CreateButton } from './CreateButton'
import { ISideAdd } from '../modules/options'
import { SimpleCalendar } from './SimpleCalendar'
import { SimpleController } from './SimpleController'
import { ISimpleControllerProps } from './utils'

interface IProps extends ISideAdd, ISimpleControllerProps {}

export function SideComponent(props:IProps) {
  return (
    <>
      <div className={styles.sideTitle}>
        U C a l e n d a r
      </div>
      <CreateButton {...props} />
      <SimpleController {...props} />
      <SimpleCalendar />
      <div>搜索栏目</div>
      <div>相关日历列表</div>
      <div>订阅日历，添加其他日历相关功能</div>
    </>
  )
}
