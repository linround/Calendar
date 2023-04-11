import React from 'react'

export const V3DayEventWrapperComponent = function (props:React.PropsWithChildren) {
  return React.cloneElement(props.children as React.ReactElement, {
    onMouseDown() {
      console.log('mousedown DayEventWrapperComponent')
    },
  })
}
