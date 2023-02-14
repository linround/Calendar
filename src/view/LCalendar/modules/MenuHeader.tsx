import React from 'react'
import {
  Button,
  Space,
  Dropdown,
  MenuProps
} from 'antd'
import { typeOptions } from './options'
import styles from './style.module.less'
import moment from 'moment'
import { SvgIcon } from '../../../components'
import { DownOutlined, GithubOutlined } from '@ant-design/icons'
import { IHeaderEvent } from '../utils/calendar'
import mainStyles from '../style.module.less'


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




  const itemMap = new Map()
  typeOptions.map((item) => {
    item && itemMap.set(item.key, item?.label)
  })



  const onClick:MenuProps['onClick'] = (e) => {
    const { key, } = e
    setType(key)
  }
  const menuProps = {
    items: typeOptions,
    onClick: onClick,
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <Button onClick={() => setToday(Date.now())}>
          今
        </Button>
        <div className={styles.headerLeftIconContainer}>
          <span
            onClick={() => prev(-1)}>
            <SvgIcon
              iconName='header_arrow-left-circle'
              className={mainStyles.iconHover}
            />
          </span>
          <>  </>
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
        <Dropdown menu={menuProps} trigger={['click']} className={styles.headerRightOptions}>
          <Button>
            <Space>
              { itemMap.get(type) }
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <GithubOutlined style={{ fontSize: 30, }} />
      </div>
    </div>
  )
}
