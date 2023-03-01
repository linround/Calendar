import React from 'react'

import Button from '@mui/material/Button'
import styles from './style.module.less'
import moment from 'moment'
import { SvgIcon } from '../../../components'
import {  GithubOutlined } from '@ant-design/icons'
import { IHeaderEvent } from '../utils/calendar'
import mainStyles from '../style.module.less'
import MenuTypeSelector from './MenuTypeSelector'


export default function (props:IHeaderEvent) {

  const {
    type,
    value,
    prev = (amount) => amount,
    next = (amount) => amount,
    setType = (type) => type,
    setToday = (today) => today,
  } = props

  const format = 'YYYY MM DD'
  const timeStr = moment(value)
    .format(format)







  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <Button variant="outlined" onClick={() => setToday(Date.now())}>今</Button>
        <div className={styles.headerLeftIconContainer}>
          <span
            onClick={() => prev(-1)}>
            <SvgIcon
              iconName='header_arrow-left-circle'
              className={mainStyles.iconHover}
            />
          </span>
          <span
            onClick={() => next(1)}>
            <SvgIcon
              iconName='header_arrow-right-circle'
              className={mainStyles.iconHover} />
          </span>
        </div>
        <div>{timeStr}</div>
      </div>

      <div className={styles.headerRight}>
        <SvgIcon
          iconName='header_search'
          className={mainStyles.iconHover}></SvgIcon>
        <MenuTypeSelector selectType={(type) => setType(type)} type={type} />
        <GithubOutlined style={{ fontSize: 30, }} />
      </div>
    </div>
  )
}
