import React from 'react'

export class SetStateClass extends React.Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {}
  }
  render() {
    const onMouseDown = () => {
      this.setState({ name: 'setState', })
      console.log('onMouseDown', this.state.name)
    }
    const onMouseMove = () => {
      console.log('onMouseMove', this.state.name)
    }
    const onPointerDown = () => {
      console.log('onPointerDown', this.state.name)
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
        SetStateClass
      </div>
    )
  }
}
