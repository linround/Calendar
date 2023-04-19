import React, { ReactElement } from 'react'

export function HeaderBodyWrapper(props:React.PropsWithChildren) {
  const { children, } = props
  return React.cloneElement(children as ReactElement, {
    onMouseDown(e:React.MouseEvent) {
      console.log(e.currentTarget)
    },
  })
}
