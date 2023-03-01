import styles from './style.module.less'
import React from 'react'
import { CreateButton } from './CreateButton'
import { ISideAdd } from '../modules/options'

export function SideComponent(props:ISideAdd) {
  return (
    <>
      <div className={styles.sideTitle}>
        C a l e n d a r
      </div>
      <CreateButton {...props} />
      <div>简版日历</div>
      <div>搜索栏目</div>
      <div>相关日历列表</div>
      <div>订阅日历，添加其他日历相关功能</div>
    </>
  )
}
