import { IProps } from './type'
import React from 'react'

const App:React.FC<IProps> = (props) => {
  console.log(props)
  return (
    <button>
      Buttons
    </button>
  )
}

export default App
