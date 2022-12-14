import { IProps } from './type'
import React from 'react'

const App:React.FC<IProps> = (props) => (
  <button {...props}>
      Buttons
  </button>
)

export default App
