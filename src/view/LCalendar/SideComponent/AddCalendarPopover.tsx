import styles from './styleSimpleMonth.module.less'
import React, {
  useContext, useLayoutEffect, useState
} from 'react'
import commonPopoverStyle from '../commonStyle/popover.module.less'
import classnames from 'classnames'
import { CalendarContext } from '../props/propsContext'
import SvgIcon from '../../../components/SvgIcon'
import { CreateCalendar } from './CreateCalendar'

export  const AddCalendarPopover = () => {
  const { addCalendarRef, } = useContext(CalendarContext)
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [openCreateDialog, setCreateDialog] = useState(false)
  const className = classnames({
    [commonPopoverStyle.popover]: true,
    [styles.add]: true,
  })


  useLayoutEffect(() => {
    if (addCalendarRef) {
      const { top, left, } = addCalendarRef.getBoundingClientRect()
      setLeft(left)
      setTop(top)
    }
  }, [addCalendarRef])



  return ((
    <>
      <CreateCalendar open={openCreateDialog} onClose={() => setCreateDialog(false)} />
      {
        addCalendarRef && <div
          className={className}
          style={{ top, left, }}>
          <div className={styles.addItem} onClick={() => setCreateDialog(true)}>
            <div className={styles.addItemIcon}>
              <SvgIcon iconName='side_plus' />
            </div>
            新建日历
          </div>
          <div className={styles.addItem} onClick={() => setCreateDialog(true)}>
            <div className={styles.addItemIcon}>
              <SvgIcon iconName='side-pocket' />
            </div>
            订阅日历</div>
        </div>
      }
    </>

  )
  )
}
