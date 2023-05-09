import React from 'react'

export function SVG() {

  return (
    <>
      {/*<StartSVG />*/}
      {/*<PositionSvg />*/}
      <BasicShapes />
      <Path />
    </>
  )
}

function Path() {
  // 关于path中的值
  // d 一个点数集以及如何绘制路径的信息
  // M 100 100 移动到坐标 100 100  大写代表绝对定位；小写代表相对定位，例如：从上一个点开始，向上移动10px，向左移动7px
  // h 100 水平向右移动100
  // h -100 水平向左移动100
  // v 100 垂直向下移动80
  // v -100 垂直向上移动80
  // z 回到初起点
  // path 元素中只存在两种贝塞尔曲线：三次贝塞尔曲线C，二次贝塞尔曲线Q
  // 使用C x1 y1, x2 y2, x y 命令创建三次贝塞尔曲线
  // (or)
  // c dx1 dy1, dx2 dy2, dx dy
  return (

    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">



      {/*todo 关于弧形A命令*/}
      {/*弧形A可创建SVG曲线，弧形基本上可以视为圆形或椭圆形的一部分
      已知椭圆形的长轴半径和短轴半径，并且已知两个点在椭圆上，根据半径和两点，可以画出两个椭圆，在每个椭圆上根据两点都可以画出两段弧形。
      所以，根据半径和两点，可以画出四种弧形
      // rx ry 长短轴
      // x-axis-rotation 沿着x方向的旋转
      // large-arc-flag 角度大小 0表示小角弧度 1表示大角弧度
      // sweep-flag 表示弧线方向 0 表示起点到终点的逆时针画弧度 1 表示起点到终点的顺时针画弧
      // x y 终点
      A rx ry x-axis-rotation large-arc-flag sweep-flag x y
      a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
      弧形命令的前两个参数是X轴半径和Y轴半径

      */}
      {/*<path d="M 10 315*/}
      {/*     L 110 215*/}
      {/*     A 30 50 0 0 1 162.55 162.45*/}
      {/*     L 172.55 152.45*/}
      {/*     A 30 50 -95 0 1 215.1 109.9*/}
      {/*     L 315 10" stroke="black" fill="green" strokeWidth="2" fillOpacity="0.5"/>*/}
      {/*<ellipse cx={150} cy={50} rx={100} ry={30} stroke={'black'} fill={'blue'} fillOpacity="0.6" strokeOpacity={0.5} ></ellipse>*/}
      <svg width="325" height="325" xmlns="http://www.w3.org/2000/svg">
        {/*
         // rx ry 长短轴
         // 沿着X方向旋转的角度
         // large-arc-flag 0小角弧度 1大角弧度 ;
         // sweep-flag 0 起点到终点逆时针画 1起点到终点顺时针画
         // 终点
         */}
        <path d="M 80 80
           A 450 450,
           0,
           0,
           1,
           125 125
           L 125 80 80 80" fill="none" stroke={'black'} strokeWidth={2}/>
        <path d="M 230 80
           A 45 45, 0, 1, 0, 275 125
           L 275 80 Z" fill="red"/>
        <path d="M 80 230
           A 45 45, 0, 0, 1, 125 275
           L 125 230 Z" fill="purple"/>
        <path d="M 230 230
           A 45 45, 0, 1, 1, 275 275
           L 275 230 Z" fill="blue"/>
      </svg>


      <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320">
        {/*<path d="M 10 315*/}
        {/*   L 110 215*/}
        {/*   A 36 60 0 0 1 150.71 170.29*/}
        {/*   L 172.55 152.45*/}
        {/*   A 30 50 -45 0 1 215.1 109.9*/}
        {/*   L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>*/}
        {/*<circle cx="150.71" cy="170.29" r="2" fill="red"/>*/}
        {/*<circle cx="110" cy="215" r="2" fill="red"/>*/}
        {/*<ellipse cx="144.931" cy="229.512" rx="36" ry="60" fill="transparent" stroke="blue"/>*/}
        {/*<ellipse cx="115.779" cy="155.778" rx="36" ry="60" fill="transparent" stroke="blue"/>*/}



      </svg>











      {/*创建一个矩形
          起始点 100 100
          向右移 100
          向下移 100
          向左移 100
          向上移 100
          */}
      {/*<path d="M300 300"/>*/}
      {/*<circle cx="300" cy="300" r="2" fill="red"/>*/}
      {/*<path d="M 10 10 h 200 m 10 90 h 200"  stroke={'black'}/>*/}
      {/*<path d="m 0,0 Q100,100 50,230 T90,230" fill="none" stroke="blue" strokeWidth="1"/>*/}
      {/*<path d="M 0 0 h 100 v 100 h -100 v -100" stroke='black' fill='transparent'></path>*/}


      {/*<path d="M 10 10 H 90 V 90 H 10 L 10 10 "></path>*/}
      {/*<circle cx={10} cy={10} r={10} fill={'blue'}  />*/}
      {/*<circle cx={90} cy={10} r={10} fill={'blue'}  />*/}
      {/*<circle cx={90} cy={90} r={10} fill={'blue'}  />*/}
      {/*<circle cx={10} cy={90} r={10} fill={'blue'}  />*/}

      {/*/!*使用C来创建三次贝塞尔曲线*!/*/}
      {/*<path d="M 10 10 C 50 100, 150 100, 200 10" strokeWidth={5} stroke="yellow" fill="transparent"/>*/}
      {/*<circle cx={10} cy={10} r={10} fill={'blue'}  />*/}
      {/*<circle cx={200} cy={10} r={10} fill={'blue'}  />*/}
      {/*<circle cx={150} cy={100} r={10} fill={'blue'}  />*/}
      {/*<circle cx={50} cy={100} r={10} fill={'blue'}  />*/}

      {/*将若干个贝塞尔曲线连起来，从而创建一条很长的平滑曲线，
      通常情况下，一个点某一侧的控制点时它与另一侧控制点的对此
      */}
      {/*使用S创建与之前类似的贝塞尔曲线
        如果S命令跟在一个C或S命令后面，
        则它的第一个控制点会被假设成前一个命令曲线的第二个控制点的中心对称点，
        如果S命令单独使用，前面没有C或S命令，那当前点将作为第一个控制点
      */}

      {/*<path d="M 10 10 S 110 100 200 10 " strokeWidth={5} stroke="yellow" fill="transparent"/>*/}
      {/*二次贝塞尔曲线Q,只需要一个控制点，用来确定起点和终点的曲线斜率 因此只需要两组参数，控制点和终点坐标*/}
      {/*<path d='M 10 10 Q 110 100 200 10' strokeWidth={5} stroke="yellow" fill="transparent"></path>*/}
      {/*<circle cx={10} cy={10} r={10} fill={'blue'}  />*/}
      {/*<circle cx={110} cy={100} r={10} fill={'blue'}  />*/}
      {/*<circle cx={200} cy={10} r={10} fill={'blue'}  />*/}




      {/*SVG中平滑连接两个贝塞尔曲线

      如果S前面有C或S,则第一个控制点会被假设为前一个命令曲线的第二个控制点的中心对称点，（以签一个结束点为起始点，同时做中心对称，

      求得第二个命令的第一个控制点）
      */}
      {/*<path d="M 10 100 C 50 10, 150 10, 200 100 S 350 190 400 100" strokeWidth={5} stroke="yellow" fill="transparent"/>*/}
      {/*<circle cx={10} cy={100} r={10} fill={'blue'}  />*/}
      {/*<circle cx={50} cy={10} r={10} fill={'blue'}  />*/}
      {/*<circle cx={150} cy={10} r={10} fill={'blue'}  />*/}
      {/*<circle cx={200} cy={100} r={10} fill={'blue'}  />*/}


      {/*<circle cx={250} cy={190} r={10} fill={'blue'}  />*/}
      {/*<circle cx={350} cy={190} r={10} fill={'blue'}  />*/}
      {/*<circle cx={400} cy={100} r={10} fill={'blue'}  />*/}






      {/*使用Q来给定一个控制点，
      用来确定起点和终点的曲线斜率

       观察以下的结果可以得知，就算是得知了初始的曲线斜率，相比知道初始的控制点，还是会发生不一致的问题;
       因为Q创建的是二次贝塞尔曲线啊
      */}

      {/*<path d="M 20 150 Q 50 50, 80 150" strokeWidth={5} stroke="black" fill="transparent"/>*/}
      {/*<path d="M 20 150 C 35 100, 65 100, 80 150" strokeWidth={5} stroke="red" fill="transparent"/>*/}
      {/*<circle cx={20} cy={150} r={10} fill={'blue'}  />*/}
      {/*<circle cx={35} cy={100} r={10} fill={'blue'}  />*/}
      {/*<circle cx={65} cy={100} r={10} fill={'blue'}  />*/}
      {/*<circle cx={80} cy={150} r={10} fill={'blue'}  />*/}

      {/*<circle cx={50} cy={50} r={10} fill={'blue'}  />*/}



      {/*在Q命令后使用T命令来延长二阶贝塞尔曲线
        第一种：接T命令以上一个贝塞尔的控制顶以结束点的中心对称点为第二个贝塞尔的控制点，第二个贝塞尔的起始点就是上一个的结束点
        第二种：在画完第一个贝塞尔曲线之后，继续画第二个；默认使用第一个个的结尾作为开始
        第三种：是第二种的变体
        第四种：以上的具体实现
      */}


      {/*<path d="M 10 100 Q 50 10, 80 100 T 150 100" strokeWidth={5} stroke="black" fill="transparent"/>*/}
      {/*<path d="M 10 100 Q 50 10, 80 100 Q 110 190 150 100" strokeWidth={5} stroke="black" fill="transparent"/>*/}
      {/*<path d="M 10 100 Q 50 10, 80 100 M 80 100 Q 110 190 150 100" strokeWidth={5} stroke="black" fill="transparent"/>*/}
      {/*<path d="M 10 100 Q 50 10, 80 100" strokeWidth={5} stroke="black" fill="transparent"/>*/}
      {/*<path d="M 80 100 Q 110 190, 150 100" strokeWidth={5} stroke="black" fill="transparent"/>*/}
      {/*<circle cx={10} cy={100} r={10} fill={'blue'}  />*/}
      {/*<circle cx={50} cy={10} r={10} fill={'blue'}  />*/}
      {/*<circle cx={80} cy={100} r={10} fill={'blue'}  />*/}


      {/*<circle cx={150} cy={100} r={10} fill={'blue'}  />*/}
      {/*<circle cx={110} cy={190} r={10} fill={'blue'}  />*/}

    </svg>
  )
}

function BasicShapes() {
  // rect 矩形 起始点 (50,50) 宽100，高150(宽高不包含strokeWidth) ；stroke:描边； rx=50 ry=20 设置边角； fill： 填充内容
  // circle 圆 (cx,cy)=>(150,50) 圆心坐标 ；r=50，圆的半径50
  // ellipse 椭圆 中心坐标(cx,cy)=>(150,50); rx=100,ry=30,x轴半径100，y轴30
  // line 线条 起始点坐标(150,0)=>(150,50),结束点坐标
  // polyline 折线 解析points，以两个数值为一个坐标（数值个数为奇数时，会自动解析坐标点，不受逗号影响）
  // polygon 多边形 和折现类型，不过最终会自动连接结束点和起始点
  return (
    <svg width="400" height="400"  xmlns="http://www.w3.org/2000/svg">
      <path d="M 0,0 Q40,205 50,230 T90,230" fill="none" stroke="blue" strokeWidth="5"/>
      <rect x={50} y={50} width={100} height={150} stroke={'red'} strokeWidth={10}  rx={50} ry={20} fill={'blue'} ></rect>
      <circle cx={150} cy={50} r={50} stroke={'green'} strokeWidth={5} fill={'yellow'} ></circle>
      <ellipse cx={150} cy={50} rx={100} ry={30} stroke={'black'} fill={'transparent'}></ellipse>
      <line x1={150} y1={0} x2={150} y2={50} stroke={'blue'} strokeWidth={5}></line>
      <polyline points=" 70,0 0, 20 70, 115 75, 130 80, 125 85, 140 90, 135 95, 150 150 50" fill={'transparent'} strokeWidth={5} stroke={'black'}/>
      <polygon points="50 50 80 80 50 100 30 80"
        stroke="yellow" fill="#061a2a" strokeWidth="5"/>
    </svg>
  )
}

function PositionSvg() {
  // 定义了一个100*100px的SVG画布
  // viewBox属性定义了画布上可以显示的区域：从(0，0)开始，到50宽，50高的区域；这50*50的区域会放到100*100的画布上显示
  // 于是就形成了放大两倍的效果
  return (
    <svg width="100" height="100"  viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="red" />
      <text x="0" y="50" fontSize="20"  fill="black">SVG</text>
    </svg>

  )
}
function StartSVG() {
  return (
    <svg
      width="400" height="400"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="red" />
      <circle cx="200" cy="0" r="200" fill="green" />
      <circle cx="200" cy="400" r="200" fill="green" />
      <text x="150" y="125" fontSize="60" textAnchor="middle" fill="white">SVG</text>
    </svg>

  )
}
