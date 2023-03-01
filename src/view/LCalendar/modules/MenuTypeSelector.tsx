import * as React from 'react'
import styles from './style.module.less'
import Button from '@mui/material/Button'
import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { typeOptions } from './options'

interface IProps {
  type:string,
  selectType: (type: string) => void
}
export default function MenuTypeSelector(props:IProps) {
  const { selectType, type, } = props


  const itemMap = new Map()
  typeOptions.map((item) => {
    item && itemMap.set(item.key, item?.label)
  })


  const menuProps = {
    items: typeOptions,
    onClick: (e:any) => selectType(e.key),
  }
  return (
    <Dropdown menu={menuProps} trigger={['click']} className={styles.headerRightOptions}>
      <Button variant="outlined">
        <Space>
          { itemMap.get(type) }
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}
