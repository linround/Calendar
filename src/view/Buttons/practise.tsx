import React from 'react'

interface IProp {
  children: React.ReactNode
}

export const FancyButton:React.FC<IProp> = React.forwardRef((props) => (
  <button className='FancyButton'>
    { props.children }
  </button>
))
