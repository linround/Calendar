import React from 'react'

export function DayWrapper(props:React.PropsWithChildren) {
  const { children, } = props
  return (
    <>
      {children}
    </>
  )
}
