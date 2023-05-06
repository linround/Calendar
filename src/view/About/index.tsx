import React from 'react'

interface AppProps {
  [prop:string] :any
}
interface AppState {
  width:number
  height:number
}
export class About extends React.Component<AppProps, AppState> {
  constructor(props:AppProps) {
    super(props)
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  canvasRef(canvas:HTMLCanvasElement) {
    if (!canvas) return
    const context = canvas.getContext('2d')!
    // setTransform使用单位矩阵重新设置当前的变换并调用变换的方法
    // 这个方法不会覆盖当前的变换矩阵，会多次叠加变换

    // a 水平缩放 c 水平倾斜 e 水平移动
    // b 垂直倾斜 d 垂直缩放 f 垂直移动
    //     1        1        0

    // context.fillStyle = '#FFA500'
    // context.fillRect(
    //   0, 0, 280, 220
    // )
    // context.fillStyle = 'red'
    // context.fillRect(
    //   0, 0, 100, 100
    // // )
    context.setTransform(
      2, 0.2, 0.8, 2, 0, 0
    )
    context.fillStyle = 'blue'
    // save
    context.save()
    context.setTransform(
      1, 0, 0, 1, 0, 0
    )
    // x轴方向 width = 100*2+100*0.8=280
    // y轴方向 height = 100*2 + 100*0.2=220
    // 在垂直方向发生倾斜，即y周坐标发生变化  注意倾斜和平移的是有区别的，坐标零点发生倾斜，还是坐标零点；
    // 但是普通坐标点发生倾斜，坐标点就会发生变化
    context.fillStyle = 'green'
    context.fillRect(
      0, 0, 100, 100
    )
    // restore 将canvas恢复到最近的保存状态
    context.restore()
    context.fillRect(
      150, 40, 100, 100
    )
  }
  render() {
    const { width, height, } = this.state
    return (
      <canvas
        width={width}
        height={height}
        ref={this.canvasRef}>
        canvas
      </canvas>
    )
  }
}
