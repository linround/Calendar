import React from 'react'
import { Link } from 'react-router-dom'
import menuStyles from './style.module.less'
import {
  ClickStyle,
  LoadingStyle,
  ButtonsStyle,
  CalendarStyle
} from './color'


export default function () {
  const ANGLE = 45
  const onMouseMove = (e:React.MouseEvent):void => {
    const content:HTMLElement = e.target as HTMLElement
    /**
     * todo
     * 获取元素的宽高
     * clientWidth 对于内联元素以及没有css样式的元素为0；
     * 否则，它是元素内部的宽度（包括padding,不包括border,margin）
     */
    const w = content.clientWidth
    const h = content.clientHeight
    /**
     *
     * offsetX 规定了事件对象与目标节点的内填充边在x轴方向的偏移量(包含padding,不包含margin)
     * offsetY 规定了事件对象与目标节点的内填充边在Y轴方向的偏移量(包含padding,不包含margin)
     * [-70,70] / 140 => [-0.5,0.5]=>[-ANGLE/2,ANGLE/2]
     *
     */
    const y = (e.nativeEvent.offsetX - (w * 0.5)) / w * ANGLE
    const x = (1 - (e.nativeEvent.offsetY - (h * 0.5))) / h * ANGLE
    content.style.transform = `perspective(300px) rotateX(${x}deg) rotateY(${y}deg)`
  }
  const onMouseOut = (e:React.MouseEvent):void => {
    const content:HTMLElement = e.target as HTMLElement
    content.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg)'
  }
  return (
    <>
      <Link to='/Calendar' target='_blank'>
        <div className={menuStyles.panel}
          onMouseMove={onMouseMove} onMouseOut={onMouseOut}>
          <div className={menuStyles.content} style={CalendarStyle}>
            U日历
          </div>
        </div>
      </Link>
    </>

  )
}
