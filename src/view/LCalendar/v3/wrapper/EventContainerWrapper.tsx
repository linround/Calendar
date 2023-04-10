import React, { ReactElement } from 'react'

/**
 * 触发 EventContainer
 * mousedown事件（使用beforeSelected 来判断是否添加 document 级别的mousedown、mousemove）
 * mousemove事件改变当当前的 编辑event 数据状态 触发EventContainer的selecting事件
 * mouseup 设置最终的事件状态 触发EventContainer的select事件
 * */
export function EventContainerWrapperComponent(props:React.PropsWithChildren) {
  return React.cloneElement(props.children as ReactElement, {
    onMouseDown() {
      console.log('mousedown  EventContainerWrapperComponent')
    },
  })
}
