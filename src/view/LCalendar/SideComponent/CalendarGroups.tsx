import React, { useState } from 'react'
import Collapse from '@mui/material/Collapse'
import { SvgIcon } from '../../../components'
import styles from './styleSimpleMonth.module.less'
import Checkbox from '@mui/material/Checkbox'
import { calendarGroup } from './utils'
import { IDataGroups } from '../props/type'
import dayStyle from '../components/day.module.less'
import classnames from 'classnames'




interface IProps extends IDataGroups{
  name: string
  type: number
}
function isChecked(checks:calendarGroup[], checked:calendarGroup) {
  const index = checks.findIndex((g) => g.groupId === checked.groupId)
  return index > -1
}


export function CalendarGroups(props:IProps) {
  const { name, groups, type, checks, setChecks, } = props
  const calendarGroups = groups.filter((item) => item.groupType === type)
  const [open, setOpen] = useState(true)
  const [hover, setHover] = useState(null)




  const handleChange = (group: calendarGroup) => {
    const index = checks.findIndex((g) => g.groupId === group.groupId)
    if (index > -1) {
      checks.splice(index, 1)
    } else {
      checks.push(group)
    }
    setChecks([...checks])
  }
  const handleClick = () => {
    setOpen(!open)
  }

  const ItemContainerClass = classnames({
    [styles.groupItemContainer]: true,
    [dayStyle.scrollContainer]: true,
  })
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
        <div className={ItemContainerClass}>
          {calendarGroups.map((group, index) => (
            <div
              key={index}
              className={styles.groupItem}
              onClick={() => handleChange(group)}
              onMouseEnter={() => setHover(group.groupId)}
              onMouseLeave={() => setHover(null)}>
              <Checkbox
                style={{
                  color: group.groupColor,
                }}
                checked={isChecked(checks, group)}
                inputProps={{ 'aria-label': 'controlled', }}
              />
              <div className={styles.groupContent}>
                {group.groupName}
              </div>
              <div className={styles.groupItemRight} style={{
                display: hover === group.groupId ? '' : 'none',
              }}>
                <SvgIcon className={styles.groupItemIcon}  iconName='side_settings' />
              </div>
            </div>
          ))}
        </div>


      </Collapse>
    </div>
  )
}
