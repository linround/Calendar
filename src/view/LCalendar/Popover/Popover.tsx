import styles from './style.module.less'
import React, {
  useCallback,
  useContext, useEffect, useState
} from 'react'
import {  MouseEventContext } from '../props/propsContext'
import { IS_EVENT, IS_HIGH_LEVEL } from '../components/type'
import { PopoverContent } from './PopoverContent'
const POPOVER_WIDTH_DEF = 300


export function Popover(props: React.PropsWithChildren<{ container:React.RefObject<HTMLElement> }>) {
  const { container, } = props
  const [left, setLeft] = useState(100)
  const [top, setTop] = useState(100)
  const { setRef, selectedRef,  setPopover, setMouseDownRef, popover, popoverEvent, } = useContext(MouseEventContext)

  // 在某个元素上mousedown 但是在别的元素上mouseup  造成popover不显示的问题 或则显示错误的问题
  // 解决以上上的的办法就是设置一个变量，来判断是点击还是位移
  // 是做时间调整的操作 也会产生显示popover
  //

  useEffect(() => {
    if (selectedRef && popover) {
      const { left, top, } = selectedRef.getBoundingClientRect()
      setLeft(left - POPOVER_WIDTH_DEF)
      setTop(top)
    }
  }, [selectedRef, popover])

  const mousedown =  useCallback((e:MouseEvent) => {
    // 如果是点击的日历事件元素内部或则点击的日历事件元素本身，不响应即可
    if ((e.target as Element).parentElement?.classList.contains(IS_EVENT) ||
      (e.target as Element).classList.contains(IS_EVENT)) {
      return
    }
    selectedRef?.classList.remove(IS_HIGH_LEVEL)
    setPopover(false)
    setMouseDownRef(null)
    setRef(null)
  }, [selectedRef])

  useEffect(() => {
    if (container && container.current) {
      container.current.addEventListener(
        'mousedown', mousedown, {
          once: true,
          passive: true,
        }
      )
    }
  }, [container, selectedRef])




  return (
    <>
      {
        (selectedRef && popover && popoverEvent) ?
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
