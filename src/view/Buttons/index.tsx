import { IProps } from './type'
import React  from 'react'


const App:React.FC<IProps> = (props) => {
  const { children,  } = props
  return (
    <>
      <button {...props}>
        { children }
      </button>
    </>
  )
}

export default App
