import React, { useState } from 'react'
import Collapse from '@mui/material/Collapse'
import { SvgIcon } from '../../../components'
import styles from './styleSimpleMonth.module.less'

interface IProps {
  name: string
}
export function CalendarGroups(props:IProps) {
  const { name, } = props
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <div className={styles.group}>
      <div className={styles.groupHeader} onClick={handleClick}>
        <div
          className={styles.groupContent}>
          {name}
        </div>
        <div className={styles.groupHeaderIcon}>
          {
            open ? <SvgIcon iconName='side-chevron-up' /> :
              <SvgIcon iconName='side-chevron-down' />
          }
        </div>
      </div>
      <Collapse in={open}>
        <div
          className={styles.groupItem}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}>
          <div className={styles.groupContent}>
            日历名
          </div>
          <div className={styles.groupItemRight} style={{
            display: show ? '' : 'none',
          }}>
            <SvgIcon className={styles.groupItemIcon}  iconName='side_settings' />
          </div>
        </div>
      </Collapse>
    </div>
  )
}
