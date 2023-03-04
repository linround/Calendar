import styles from './styleSimpleMonth.module.less'
import React, {
  useContext, useEffect, useState
} from 'react'
import commonPopoverStyle from '../commonStyle/popover.module.less'
import classnames from 'classnames'
import { CalendarContext } from '../props/propsContext'

export  const AddCalendarPopover = () => {
  const { addCalendarRef, } = useContext(CalendarContext)
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const className = classnames({
    [styles.searchPopover]: true,
    [commonPopoverStyle.popover]: true,
  })
  useEffect(() => {
    if (addCalendarRef) {
      const { top, left, } = addCalendarRef.getBoundingClientRect()
      setLeft(left)
      setTop(top)
    }
  }, [addCalendarRef])
  return ((
    addCalendarRef && <div
      className={className}
      style={{ top, left, }}>
      <div>新建日历</div>
      <div>订阅日历</div>
    </div>
  )
  )
}
