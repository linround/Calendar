import React from 'react'

interface IProp {
  children: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, IProp>((props, ref) => (
  <input
    ref={ref}
    {...props}
  />
))

export const FancyButton:React.FC<IProp> = React.forwardRef(function Button(props) {
  return (
    <button className='FancyButton'>
      { props.children }
    </button>
  )
})
