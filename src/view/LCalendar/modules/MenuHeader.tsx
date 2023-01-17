import React, { useState } from 'react'
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

export default function () {

  const time = Date.now()
  const format = 'YYYY MM DD'
  const timeStr = moment(time)
    .format(format)

  const handleClick = () => {
    console.log(123)
  }


  const [type, setType] = useState('day')
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
          <SvgIcon
            iconName='left-arrow'
            className={styles.headerLeftIcon} />
          <SvgIcon
            iconName='right-arrow'
            className={styles.headerRightIcon} />
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
