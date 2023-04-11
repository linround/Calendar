import React, { ReactElement } from 'react'

export function V3DayColumnWrapperComponent(props:React.PropsWithChildren) {
  return React.cloneElement(props.children as ReactElement, {
    onMouseDown(e:React.MouseEvent) {
      console.log('mousedown dayBodyWrapper')
    },
  })
}
