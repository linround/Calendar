import React from 'react'
import moment from '@/src/utils/moment.ts'
import { SvgIcon } from '@/src/components'
import styles from './style.module.less'
import {
  Button, Dropdown, Space, MenuProps
} from 'antd'
import { DownOutlined } from '@ant-design/icons'

export default function () {

  const time = Date.now()
  const format = 'YYYY MM DD'
  const timeStr = moment(time)
    .format(format)

  const handleClick = () => {
    console.log(123)
  }
  const handleSelect:MenuProps['onClick'] = (e) => {
    console.log('***handleSelect***', e)
  }



  const items:MenuProps['items'] = [
    {
      label: '日',
      key: 'day',
    },
    {
      label: '周',
      key: 'week',
    },
    {
      label: '月',
      key: 'month',
    }
  ]
  const menuProps = {
    items,
    onClick: handleSelect,
  }
  return (
    <div>
      <div>
        <Button onClick={handleClick}>
          今
        </Button>
        <div>
          <SvgIcon
            iconName='left-arrow'
            className={styles.headerLeftIcon} />
          <SvgIcon
            iconName='right-arrow'
            className={styles.headerRightIcon} />
        </div>
        <div>{timeStr}</div>
      </div>

      <div>
        <Dropdown menu={menuProps} trigger={['click']}>
          <Button>
            <Space>
              Button
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
