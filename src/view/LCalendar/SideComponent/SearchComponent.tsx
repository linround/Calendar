import React from 'react'
import { Input } from '@mui/material'
import styles from './styleSimpleMonth.module.less'

export  function SearchComponent() {
  return (
    <div className={styles.search}>
      <Input
        fullWidth={true}
        placeholder="搜索联系人"
      />
    </div>
  )
}
