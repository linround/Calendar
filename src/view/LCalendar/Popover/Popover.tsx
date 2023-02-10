import styles from './style.module.less'
import React, {
  useContext, useEffect, useState
} from 'react'
import {  MouseEventContext } from '../props/propsContext'
import { PopoverContent } from './PopoverContent'
import { POPOVER_WIDTH_DEF } from './helpers'


export function Popover() {
  const [left, setLeft] = useState(100)
  const [top, setTop] = useState(100)
  const { popoverEvent,
    showPopover,
    popoverRef, } = useContext(MouseEventContext)

  // 在某个元素上mousedown 但是在别的元素上mouseup  造成popover不显示的问题 或则显示错误的问题
  // 解决以上上的的办法就是设置一个变量，来判断是点击还是位移
  // 是做时间调整的操作 也会产生显示popover
  //

  useEffect(() => {
    if (showPopover && popoverRef) {
      const { left, top, } = popoverRef.getBoundingClientRect()
      setLeft(left - POPOVER_WIDTH_DEF)
      setTop(top)
    }
  }, [popoverRef, showPopover])




  return (
    <>
      {
        (showPopover && popoverEvent) ?
          <div
            style={{
              top: `${top}px`,
              left: `${left - 5}px`,
              width: `${POPOVER_WIDTH_DEF}px`,
            }}
            className={styles.popoverContainer}>
            <PopoverContent event={popoverEvent} /></div> :
          ''
      }
    </>
  )
}
