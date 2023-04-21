import React, { ReactNode } from 'react'

export function NonWrapper(props:React.PropsWithChildren):ReactNode {
  const { children, } = props
  return children
}
