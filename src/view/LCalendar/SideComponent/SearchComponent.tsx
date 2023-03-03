import React from 'react'
import styles from './styleSimpleMonth.module.less'

export  function SearchComponent() {
  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        placeholder="搜索联系人"
      />
    </div>
  )
}
