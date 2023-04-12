import React, { ReactElement } from 'react'

interface IProps {
  daysContainer:HTMLDivElement
  scrollContainer: HTMLDivElement
}
export function V3DayColumnWrapperComponent(props:React.PropsWithChildren<IProps>) {
  return React.cloneElement(props.children as ReactElement, {
    onMouseDown(e:React.MouseEvent) {
      console.log('mousedown dayBodyWrapper')
    },
  })
}
