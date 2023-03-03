import React, { useState } from 'react'
import Collapse from '@mui/material/Collapse'
import { SvgIcon } from '../../../components'
import styles from './styleSimpleMonth.module.less'
import Checkbox from '@mui/material/Checkbox'
import { calendarGroup, createCalendarGroup } from './utils'




interface IProps {
  name: string
  calendarGroups: calendarGroup[]
  type: number
}
export function CalendarGroups(props:IProps) {
  const { name, calendarGroups, type, } = props
  const groups = calendarGroups.filter((item) => item.type === type)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const [checked, setChecked] = useState<number[]>([])
  const handleChange = (group: calendarGroup) => {
    const index = checked.findIndex((id) => id === group.id)
    if (index > -1) {
      checked.splice(index, 1)
    } else {
      checked.push(group.id)
    }
    setChecked([...checked])
  }
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
        {groups.map((group, index) => (
          <div
            key={index}
            className={styles.groupItem}
            onClick={() => handleChange(group)}
            onMouseEnter={() => setHover(group.id)}
            onMouseLeave={() => setHover(null)}>
            <Checkbox
              style={{
                color: group.color,
              }}
              checked={checked.includes(group.id)}
              inputProps={{ 'aria-label': 'controlled', }}
            />
            <div className={styles.groupContent}>
              {group.name}
            </div>
            <div className={styles.groupItemRight} style={{
              display: hover === group.id ? '' : 'none',
            }}>
              <SvgIcon className={styles.groupItemIcon}  iconName='side_settings' />
            </div>
          </div>
        ))}

      </Collapse>
    </div>
  )
}
