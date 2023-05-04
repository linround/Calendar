import React, { useState } from 'react'

export function SetStateFunction() {
  const [name, setName] = useState<string|null>()
  const onMouseDown = () => {
    setName('setState')
  }
  const onMouseMove = () => {
    console.log(name)
  }
  const onPointerDown = () => {
    console.log('onPointerDown', name)
  }
  return (
    <div
      style={{
        height: '50px',
        border: 'solid black 1px',
      }}
      onPointerDown={onPointerDown}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}>
      SetStateFunction
    </div>
  )
}

