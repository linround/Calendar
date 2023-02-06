import styles from './style.module.less'
import React, {
  useCallback, useContext, useState
} from 'react'
import { BaseContext } from '../props/propsContext'
export function Popover() {
  const [left, setLeft] = useState(100)
  const [top, setTop] = useState(100)
  const { setRef, selectedRef, } = useContext(BaseContext)

  const onClick = useCallback(() => {
    if (selectedRef) {
      const { left, top, } = selectedRef.getBoundingClientRect()
      setLeft(left - 200)
      setTop(top)
    }
  }, [selectedRef])
  document.documentElement.addEventListener(
    'click', onClick, {}
  )


  return (
    <>
      {
        selectedRef ?
          <div
            style={{
              top: `${top}px`,
              left: `${left}px`,
            }}
            className={styles.popoverContainer}>
            Popover</div> :
          ''
      }
    </>
  )
}
