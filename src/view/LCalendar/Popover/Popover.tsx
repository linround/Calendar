import styles from './style.module.less'
import React, {
  useCallback, useContext, useEffect, useState
} from 'react'
import { BaseContext } from '../props/propsContext'
export function Popover() {
  const [left, setLeft] = useState(100)
  const [top, setTop] = useState(100)
  const { setRef, selectedRef, showPopover, setShowPopover, } = useContext(BaseContext)

  const onClick = useCallback(() => {
  }, [])
  useEffect(() => {
    console.log(selectedRef)
    if (selectedRef) {
      const { left, top, } = selectedRef.getBoundingClientRect()
      setLeft(left - 200)
      setTop(top)
    }
  }, [selectedRef])
  document.body.addEventListener('click', onClick)


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
