import React from 'react'

export function NoopWrapper(props:React.PropsWithChildren) {
  return (
    <>
      {props.children}
    </>
  )
}
