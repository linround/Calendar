import React, { useContext } from 'react'
import styles from './styleSimpleMonth.module.less'
import { SvgIcon } from '../../../components'
import { CalendarContext } from '../props/propsContext'


export  function SearchComponent() {
  const { setAddCalendarRef, } = useContext(CalendarContext)
  const showPopover = (event:React.MouseEvent) => {
    setAddCalendarRef(event.currentTarget)
  }
  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        placeholder="搜索联系人"
      />
      <div className={styles.searchIcon} onClick={showPopover }>
        <SvgIcon iconName='side-plus-circle' />
      </div>
    </div>
  )
}
