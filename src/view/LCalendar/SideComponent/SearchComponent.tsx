import React, { useState } from 'react'
import styles from './styleSimpleMonth.module.less'
import { SvgIcon } from '../../../components'
import { stopDefaultEvent } from '../utils/events'


interface IPopover {
  left:number
  top:number
}
const Popover = (props:IPopover) => {
  const { top, left, } = props
  return ((
    <div
      className={styles.searchPopover}
      onClick={(event) => stopDefaultEvent(event)}
      style={{ top, left, }}>
      <div>新建日历</div>
      <div>订阅日历</div>
    </div>
  )
  )
}

export  function SearchComponent() {
  const [bottom, setBottom] = useState(0)
  const [left, setLeft] = useState(0)
  const showPopover = (event:React.MouseEvent) => {
    const { bottom, left, } = event.currentTarget.getBoundingClientRect()
    setBottom(bottom)
    setLeft(left)
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
      <Popover top={bottom} left={left} />
    </div>
  )
}
