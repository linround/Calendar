import React from 'react'
import SvgIcon from '../../components/SvgIcon'

function App():React.ReactElement {
  return (
    <>
      <SvgIcon
        iconName='load-file'
        svgProp={{ width: 100, height: 100, fill: '#ffffff', }}
      />
      <SvgIcon
        iconName='react'
        svgProp={{ width: 100, height: 100, fill: '#ffffff', }}
      />
    </>
  )
}

export default App
