import React from 'react'
import {
  Button,
  Space,
  Dropdown,
  MenuProps
} from 'antd'
import { typeOptions } from './options'
import styles from './style.module.less'
import moment from '@/src/utils/moment.ts'
import { SvgIcon } from '@/src/components'
import { MIDDLE_SIZE } from '@/src/components/SvgIcon'
import { DownOutlined, GithubOutlined } from '@ant-design/icons'
import { IHeaderEvent } from '../utils/calendar'


export default function (props:IHeaderEvent) {
  const {
    type = 'day',
    prev = (amount) => amount,
    next = (amount) => amount,
    setType = (type) => type,
  } = props

  const time = Date.now()
  const format = 'YYYY MM DD'
  const timeStr = moment(time)
    .format(format)

  const handleClick = () => {
    console.log(123)
  }


  const handleSelect:MenuProps['onClick'] = (e) => {
    const { key, } = e
    setType(key)
  }
  const itemMap = new Map()
  typeOptions.map((item) => {
    item && itemMap.set(item.key, item?.label)
  })




  const menuProps = {
    items: typeOptions,
    onClick: handleSelect,
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <Button onClick={handleClick}>
          今
        </Button>
        <div className={styles.headerLeftIconContainer}>
          <span
            onClick={() => prev(-1)}>
            <SvgIcon
              iconName='left-arrow'
              className={styles.headerLeftIcon} />
          </span>
          <span
            onClick={() => next(1)}>
            <SvgIcon
              iconName='right-arrow'
              className={styles.headerRightIcon} />
          </span>
        </div>
        <div>{timeStr}</div>
      </div>

      <div className={styles.headerRight}>
        <SvgIcon iconName='search' className={styles.headerRightIconSearch}></SvgIcon>
        <Dropdown menu={menuProps} trigger={['click']} className={styles.headerRightOptions}>
          <Button>
            <Space>
              { itemMap.get(type) }
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <GithubOutlined style={{ fontSize: MIDDLE_SIZE, }} />
      </div>
    </div>
  )
}
