import React from 'react'

interface AppProps {
  [prop:string] :any
}
interface AppState {
  width:number
  height:number
}

function canvasClip(context:CanvasRenderingContext2D) {
  context.save()
  const cx = 500
  const cy = 500
  const cr = 100
  context.setTransform(
    1, 0, 0, 1, 0, 0
  )
  context.beginPath()
  context.fillStyle = 'red'
  context.arc(
    cx, cy, cr, 0, Math.PI * 2, false
  )
  context.fill()


  // 绘制第二个圆
  // 通过清空子路径列表开始一个新路径
  // 例如：如果不调用 beginPath fillStyle就不会被重新设置
  context.beginPath()
  context.fillStyle = 'blue'
  context.arc(
    cx + 100, cy, cr, 0, -Math.PI * 2, true
  )
  context.fill()


  // 绘制第三个圆形
  context.beginPath()
  context.fillStyle = 'yellow'
  context.arc(
    cx, cy + 100, cr, 0, -Math.PI * 2, true
  )
  // fill是对图像内部进行填充
  context.fill()
  // clip 用于从canvas中裁剪任意形状和尺寸
  // 一旦裁剪了某个区域，所有之后的绘制都会被限制在被裁减区内，不能访问画布上的其他区域。
  // 可以通过在使用clip方法之前通过使用save方法对当前画布进行保存，并在以后的任意时间通过restore方法进行恢复

  // clip 将当前创建的路径设置位当前裁剪路径
  // 这个算法会裁剪掉路径外的值，只保留路径内的可操作区域
  // 默认使用    非零缠绕原则  来确定给定点是否落在封闭曲线内
  context.clip()

  // 绘制第四个圆
  context.beginPath()
  context.strokeStyle = '#ccc'
  context.fillStyle = 'black'
  context.lineWidth = 10
  context.arc(
    cx, cy, cr + 30, 0, Math.PI * 2, false
  )
  // stroke是画出图形路径
  context.fill()
  context.stroke()
  context.restore()
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
    // save 将绘制状态保存到栈中
    // 绘制状态的组成:
    // 当前的变换矩阵
    // 当前的剪切区域
    canvasClip(context)
    // 当前的虚线列表
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
