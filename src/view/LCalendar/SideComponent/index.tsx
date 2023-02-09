import styles from './style.module.less'
import { SvgIcon } from '../../../components'
import React from 'react'

export function SideComponent() {
  return (
    <>
      <div className={styles.sideTitle}>
        C a l e n d a r
      </div>
      <div className={styles.sideCreate}>
        <div className={styles.sideCreateButton}>
          <SvgIcon iconName='popover_plus' />
        </div>
      </div>
      <div>简版日历</div>
      <div>搜索栏目</div>
      <div>相关日历列表</div>
      <div>订阅日历，添加其他日历相关功能</div>
    </>
  )
}
