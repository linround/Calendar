import React from 'react'
import style from './svg.module.less'

export function SVG() {

  return (
    <>
      {/*<StartSVG />*/}
      {/*<PositionSvg />*/}
      {/*<BasicShapes />*/}
      {/*<Path />*/}
      {/*<Strokes />*/}
      {/*<Gradient />*/}
      {/*<RadialGradient />*/}
      {/*<Patterns/>*/}
      {/*<Text />*/}
      {/*<Transformations />*/}
      {/*<Transform />*/}
      {/*<Skew />*/}
      {/*<Clip />*/}
      {/*<Mask />*/}
      {/*<Other />*/}
      <Filter />
    </>
  )
}

function Filter() {
  return (
    <>
      {/*
        使用 width height指定了块状的绝对宽高
        使用 viewBox 对绝对宽高进行单位划分
        使用ViewBox之后，内部的元素就是根据ViewBox的单位进行划分
      */}
      <svg width="400" height={400} viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg" version="1.1">
        {/*
          使用Circle标识四个端点的坐标位置
        */}
        <circle cx={0} cy={0} r={5} stroke={'blue'} strokeWidth={30}></circle>
        <circle cx={0} cy={400} r={5} stroke={'blue'} strokeWidth={30}></circle>
        <circle cx={400} cy={0} r={5} stroke={'blue'} strokeWidth={30}></circle>
        <circle cx={400} cy={400} r={5} stroke={'blue'} strokeWidth={30}></circle>
        <defs>
          {/*
          filterUnits 定义x,y width height使用的坐标系系统
              objectBoundingBox 元素的包围盒的分数或百分比。
              userSpaceOnUse 元素在当前用户坐标系中的位置和大小
          */}
          <filter id="MyFilter" filterUnits="userSpaceOnUse"
            x="0" y="0"
            width="200" height="120">
            {/*
            feGaussianBlur filter参数之一  高斯模糊
              in 定义了输入信息
                SourceGraphic
                SourceAlpha 只使用透明度
                BackgroundImage
                BackgroundAlpha 只使用透明度
                FillPaint
                StrokePaint
              stdDeviation 属性定义了模糊操作的标准差  标准差越大越模糊
              设置了模糊度为 4 以及把 result 保存在了一个名为 "blur" 的临时缓冲区中
            */}
            {/*
              4. 使用 feGaussianBlur 进行高斯模糊 输入SourceAlpha 输出blur
            */}
            <feGaussianBlur in="SourceAlpha" result="blur" stdDeviation="5" />
            {/*
              5. 使用 feOffset 创建一个偏移图元  输入blur  输出offsetBlur
            */}
            <feOffset in="blur" dx="10"  dy="10" result="offsetBlur"/>
            {/*
              6. 使用feSpecularLighting生成一个光照效果
              输入 blur 输出 specOut
            */}
            <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75"
              specularExponent="20" lighting-color="#bbbbbb"
              result="specOut">
              <fePointLight x="-5000" y="-10000" z="20000"/>
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
              k1="0" k2="1" k3="1" k4="0" result="litPaint"/>

            <feMerge>
              <feMergeNode in="offsetBlur"/>
              <feMergeNode in="litPaint"/>
            </feMerge>
          </filter>
        </defs>

        <g filter={'url(#MyFilter)'}>
          {/*
            1.画一个外圈
          */}
          <path fill="none" stroke="black" stroke-width="10"
            d="M50,66 c-50,0 -50,-60 0,-60 h100 c50,0 50,60 0,60z " />

          <circle cx={50} cy={5} r={5} stroke={'blue'} fill={'yellow'} strokeWidth={2}></circle>
          <circle cx={50} cy={66} r={5} stroke={'blue'} fill={'yellow'} strokeWidth={2}></circle>
          {/*
            2.内部画一个实体
          */}
          <path fill="black"
            d="M60,56 c-30,0 -30,-40 0,-40 h80 c30,0 30,40 0,40z" />
          <circle cx={60} cy={56} r={5} stroke={'blue'} fill={'yellow'} strokeWidth={2}></circle>
          <circle cx={60} cy={20} r={5} stroke={'blue'} fill={'yellow'} strokeWidth={2}></circle>
          {/*
            3.绘制文字位置
          */}
          <g fill="#FFFFFF" stroke="black" font-family="Verdana" >
            <text x="52" y="42">SVG</text>

            <circle cx={52} cy={52} r={5} stroke={'blue'} strokeWidth={2}></circle>
          </g>
        </g>
      </svg>

    </>
  )
}

function Other() {
  return (
    <>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,5 100,30 70,100 20,150" fill={'blue'} />
        <foreignObject x="20" y="40" width="50" height={20}>
          <div style={{
            height: '100%',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: 'white', overflowY: 'auto',
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed mollis mollis mi ut ultricies. Nullam magna ipsum,
            porta vel dui convallis, rutrum imperdiet eros. Aliquam
            erat volutpat.
          </div>
        </foreignObject>
      </svg>

      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200">
        <image
          x="100"
          y="100"
          width="50"
          height="50"
          transform="rotate(45,100 100)"
          href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image/mdn_logo_only_color.png" />
        <rect x={0} y={0} width={200} height={200} strokeWidth={5} stroke={'blue'} fill={'none'}></rect>
        <circle cx={100} cy={100} r={5} strokeWidth={5} stroke={'blue'} fill={'none'}></circle>
      </svg>

    </>
  )
}
function Mask() {
  return (
    <>
      <svg width={600} height={600} version="1.1" xmlns="http://www.w3.org/2000/svg" >
        <defs>
          <linearGradient id="Gradient">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="Gradient2" x1="0" y1="0"  x2="1"  y2="0">
            <stop offset="0%" stopColor="green"/>
            <stop offset="100%" stopColor="red"/>
          </linearGradient>
          <mask id="Mask">
            <rect x="0" y="0" width="100" height="200" fill="url(#Gradient)"  />
          </mask>
        </defs>
        {/*
          opacity={0.5} 和 fillOpacity={0.5} 是一致的
          strokeOpacity 用来描述描边是的透明度填充
        */}
        <rect x="200" y="200" width="200" height="200" fill="url(#Gradient2)"   fillOpacity={0.5} />
        <rect x="0" y="0" width="200" height="200" fill="green" />
        {/*
        mask
          宽度只有一半，高度和容器等高
          从左到右透明度线性渐变

        mask使用透明度遮住了红色，从而看到从绿色到红色的过渡
        如果没有mask就红了
        */}
        <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)" />
      </svg>
      {/*
        这里定义了 使用红色填充 半径为50的红色内容填充；边宽40，黄色不透明度为0.5描边
        发生了两个颜色交叉
            黄色边线向内 与红色交叉
            黄色边线向外 与蓝色交叉
            从而产生过渡色

        同时还发现，描边的中心点圆的边缘线，宽度均匀的向两侧延申
      */}
      <svg  width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg"  >
        <rect x="0" y="0" width="200" height="200" fill="blue" />
        <circle cx="100" cy="100" r="50" stroke="yellow" strokeWidth="40" strokeOpacity="0.5" fill="red" />
        <circle cx="100" cy="100" r="70" stroke="white" strokeWidth="5"  fill="none" />
        <circle cx="100" cy="100" r="30" stroke="white" strokeWidth="5"  fill="none" />
      </svg>

    </>
  )
}

function Clip() {
  return (
    <>
      <svg width={600} height={600} version="1.1" xmlns="http://www.w3.org/2000/svg" >
        <defs>
          <clipPath id="cut-off-bottom">
            <rect x="0" y="0" width="200" height="100" />
          </clipPath>
        </defs>

        <circle cx="100" cy="100" r="100" clip-path="url(#cut-off-bottom)" />

        <circle cx="100" cy="100" r="8" fill={'red'} clip-path="url(#cut-off-bottom)"/>
      </svg>


    </>
  )
}

function Skew() {
  return (
    <>
      {/*<svg viewBox="-5 -5 10 10" xmlns="http://www.w3.org/2000/svg">*/}
      {/*  <rect x="-3" y="-3" width="6" height="6" />*/}

      {/*  <rect x="-3" y="-3" width="6" height="6" fill="red"*/}
      {/*    transform="skewY(30)" />*/}
      {/*</svg>*/}
      {/*


      skewY(<a>) 变换函数指定了沿 y 轴倾斜 a° 的倾斜变换。 skewY 同理
      */}
      <svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg" version="1.1">
        {/*
          */}
        <rect x="200" y="200"  width="60" height="60" fill={'none'} stroke={'black'} strokeWidth={5} />
        <circle cx={230} cy={230} r={5} fill={'blue'} ></circle>


        {/*
        matrix(<a> <b> <c> <d> <e> <f>)
        a 水平缩放 c 水平倾斜 e 水平移动
        b 垂直倾斜 d 垂直缩放 f 垂直移动
            1        1        0
        */}
        <rect x="200" y="200"
          transform="matrix(1 0 0 1 -60 0)"
          width="60" height="60" stroke={'green'} fill={'none'} strokeWidth={6} />

        {/*
        垂直倾斜0.6 =>skewY(30) tan30
        垂直倾斜1 =>skewY(45)  即正切值 tan45
        垂直倾斜1.7 =>skewY(60) tan60
        */}
        <rect x="200" y="200"
          transform="matrix(1 0.59 0 1 -0 -0)"
          width="60" height="60" stroke={'green'} fill={'none'} strokeWidth={6} />
        <rect x="200" y="200"
          transform="matrix(1 1 0 1 -0 -0)"
          width="60" height="60" stroke={'green'} fill={'none'} strokeWidth={6} />
        <rect x="200" y="200"
          transform="matrix(1 1.7 0 1 -0 -0)"
          width="60" height="60" stroke={'green'} fill={'none'} strokeWidth={6} />


        {/*
        旋转 未指定的话，旋转中心就是零点
          - 默认正数是顺时针旋转
          - 负数是逆时针旋转
        */}
        <rect x="200" y="200"
          transform={'rotate(30,230,230)'}
          width="60" height="60" stroke={'blue'} fill={'none'} strokeWidth={6} />


        <rect x="200" y="200"
          transform={'skewX(30)'}
          width="60" height="60" stroke={'blue'} fill={'none'} strokeWidth={6} />
        <rect x="200" y="200"
          transform={'skewX(45)'}
          width="60" height="60" stroke={'blue'} fill={'none'} strokeWidth={6} />
        <rect x="200" y="200"
          transform={'skewX(60)'}
          width="60" height="60" stroke={'blue'} fill={'none'} strokeWidth={6} />

        <rect x="200" y="200"
          transform={'skewY(30)'}
          width="60" height="60" stroke={'blue'} fill={'none'} strokeWidth={6} />
        <rect x="200" y="200"
          transform={'skewY(45)'}
          width="60" height="60" stroke={'blue'} fill={'none'} strokeWidth={6} />
        <rect x="200" y="200"
          transform={'skewY(60)'}
          width="60" height="60" stroke={'blue'} fill={'none'} strokeWidth={6} />

      </svg>
    </>
  )
}
function Transform() {
  return (
    <>
      <svg viewBox="-40 0 150 100" xmlns="http://www.w3.org/2000/svg">
        <g fill="grey"
          transform="rotate(-10 50 100)
                translate(-36 45.5)
                skewX(40)
                scale(1 0.5)">
          <path id="heart" d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" />
        </g>

        <use href="#heart" fill="none" stroke="red"/>
      </svg>

    </>
  )
}

// 基础变形
function Transformations() {
  return (
    <>
      <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <rect x={0} y={0} height={600} width={600} stroke={'red'} strokeWidth={5} fill={'none'}></rect>
        <g fill="red">
          {/*
            变形基础：
              translate 平移 将左边顶平移对应的距离
              rotate  旋转（默认根据中心点 0,0 旋转一定的角度）
              倾斜、斜切
                skewX()
                skewY()
              缩放
                scale() 左边点的x,y都会（相对于0,0坐标）进行缩放，所以长度也会发生缩放
          */}
          <rect x="100" y="100" width="50" height="50"  transform="translate(100,100)"/>
          <rect x="200" y="200"  width="60" height="60"  />
          <circle cx={230} cy={230} r={5} fill={'blue'}></circle>
          <rect x="200" y="200" width="50" height="50" transform="rotate(-45)"  />
          {/*
            以下缩放与viewBox是一致的
            实际是100*100，但是viewBox定义成了50*50,所以放在 内部的元素就相当于扩大了100/50=2倍
          */}

          {/*<rect x="0" y="0" width="50" height="50" transform="scale(2)"  />*/}
          <svg width="100" height="100" viewBox="0 0 50 50">
            <rect width="50" height="50" />
          </svg>
        </g>

      </svg>
    </>
  )
}
function Text() {
  return (
    <>
      <svg width="600" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <rect x={0} y={0} height={200} width={600} stroke={'red'} strokeWidth={5} fill={'none'}></rect>
        <circle cx={100} cy={100} r={5} fill={'black'}></circle>
        {/*
        text-anchor
            start 坐标点 (100,100)作为文字的起始点
            middle 坐标点 (100,100)作为文字的中点
            end 坐标点 (100,100)作为文字的结束点
            inherit
        */}
        <text x="100" y="100"
          fontSize={16} fontWeight={600} letterSpacing={5} wordSpacing={10}
          fill={'red'} stroke={'blue'}
          strokeWidth={1} textAnchor={'inherit'}>
          Hello World!</text>


        <circle cx={200} cy={50} r={5} fill={'black'}></circle>
        <circle cx={300} cy={30} r={5} fill={'black'}></circle>
        <text x={200} y={50}>
          {/*
            x,y为容器重新设置相关坐标
            dx dy 将文字从当前位置进行平移
            rotate 对文字进行旋转
            textLength
          */}
          <tspan
            x={300} y={30}
            rotate={0}
            textLength={150}
            dx={-100}
            dy={20}>
            This is an example text.
          </tspan>
        </text>

        <path id="my_path" d="M 100,200 C 250,150 400,150 500,200" stroke={'black'} strokeWidth={30} fill="transparent" />
        <text fill={'white'}>
          <textPath  href="#my_path">
            This text follows a curve.This text follows a curve.This text follows a curve.
          </textPath>
        </text>
      </svg>
    </>
  )
}

function Patterns() {
  return (
    <>
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <radialGradient id="Gradient1">
            <stop offset="5%" stopColor="white"/>
            <stop offset="95%" stopColor="blue"/>
          </radialGradient>
          <linearGradient id="Gradient2" x1="0" y1="0"  x2="0"  y2="1">
            <stop offset="5%" stopColor="red"/>
            <stop offset="95%" stopColor="orange"/>
          </linearGradient>
          {/*
          pattern属性：
            patternUnits（用于定义自身与外部容器的关系）
                userSpaceOnUse 指明具体位置信息
                objectBoundingBox 只需要指明百分比即可 （默认值）
            patternContentUnits (用于定义内部元素与外部容器的关系)
                userSpaceOnUse 指明具体位置信息（默认值）
                objectBoundingBox 只需要指明百分比即可
          */}
          {/*pattern 会不断的在对应空间中重复*/}
          <pattern id="Pattern" x="0" y="0" width=".25" height=".25" patternContentUnits="userSpaceOnUse" patternUnits={'objectBoundingBox'}>
            <rect x="0" y="0" width="50" height="50" fill="skyblue"/>
            <rect x="25" y="25" width="20" height="20" fill="url(#Gradient2)"/>
            <circle cx="25" cy="25" r="20" fill="url(#Gradient1)" fillOpacity="0.5"/>
            {/*
            以下圆圈转为百分比 都是相对于最外部容器的大小进行比例变化
            25/200 = 0.125
            2/200 = 0.01
            */}
            <circle cx={25} cy={25} r={25} stroke={'black'} strokeWidth={2} fill="transparent"></circle>
          </pattern>
        </defs>








        {/*百分比形式下的pattern*/}

        {/*<defs>*/}
        {/*  <radialGradient id="Gradient1">*/}
        {/*    <stop offset="5%" stopColor="white"/>*/}
        {/*    <stop offset="95%" stopColor="blue"/>*/}
        {/*  </radialGradient>*/}
        {/*  <linearGradient id="Gradient2" x1="0" y1="0"  x2="0"  y2="1">*/}
        {/*    <stop offset="5%" stopColor="red"/>*/}
        {/*    <stop offset="95%" stopColor="orange"/>*/}
        {/*  </linearGradient>*/}
        {/*  /!**/}
        {/*  pattern属性：*/}
        {/*    patternUnits（用于定义自身与外部容器的关系）*/}
        {/*        userSpaceOnUse 指明具体位置信息*/}
        {/*        objectBoundingBox 只需要指明百分比即可 （默认值）*/}
        {/*    patternContentUnits (用于定义内部元素与外部容器的关系)*/}
        {/*        userSpaceOnUse 指明具体位置信息（默认值）*/}
        {/*        objectBoundingBox 只需要指明百分比即可*/}
        {/*  *!/*/}
        {/*  /!*pattern 会不断的在对应空间中重复*!/*/}
        {/*  <pattern id="Pattern" x="0" y="0" width=".25" height=".25" patternContentUnits="objectBoundingBox" patternUnits={'objectBoundingBox'}>*/}
        {/*    /!*<rect x="0" y="0" width="50" height="50" fill="skyblue"/>*!/*/}
        {/*    /!*<rect x="25" y="25" width="20" height="20" fill="url(#Gradient2)"/>*!/*/}
        {/*    /!*<circle cx="25" cy="25" r="20" fill="url(#Gradient1)" fillOpacity="0.5"/>*!/*/}
        {/*    <circle cx={0.125} cy={0.125} r={0.125} stroke={'black'} strokeWidth={0.01} fill="transparent"></circle>*/}
        {/*  </pattern>*/}
        {/*</defs>*/}



        <rect fill="url(#Pattern)" stroke="black" x="0" y="0" width="200" height="200"/>
      </svg>

    </>
  )
}

function RadialGradient() {
  return (
    <>
      <svg width="120" height="120" version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        {/*
        为什么需要焦点呢？
        cx cy r 确定了径向渐变所影响的范围 如果不指定焦点位置，默认焦点就是中心坐标即cx cy
        指定焦点即可指明对应的"光源"坐标点，从而更改相关的渐变效果
        spreadMethod 具有三个值： pad reflect repeat 指明第一次渐变结束后的填充行为
        reflect 会一直反复 1 2 3 2 1 2 3 2 1···· 直到将整个填充
        repeat会一直重复 1 2 3 1 2 3 1 2 3···直到整个填充

        gradientUnits 具有 userSpaceOnUse和objectBoundingBox两个值
          userSpaceOnUse 是需要指明具体为渐变位置信息
          objectBoundingBox 只需要指明百分比即可 (默认值)
        */}
        <defs>

          <radialGradient id="Gradient"
            cx="0.1" cy="0.1" r="0.20" fx="0.10" fy="0.10"  gradientUnits="objectBoundingBox" spreadMethod={'reflect'}>
            <stop offset="0%" stopColor="white"/>
            <stop offset="50%" stopColor="blue"/>
            <stop offset="100%" stopColor="red"/>
          </radialGradient>
          {/*<radialGradient id="Gradient"*/}
          {/*  cx="10" cy="10" r="20" fx="10" fy="10"  gradientUnits="userSpaceOnUse" spreadMethod={'reflect'}>*/}
          {/*  <stop offset="0%" stopColor="white"/>*/}
          {/*  <stop offset="50%" stopColor="blue"/>*/}
          {/*  <stop offset="100%" stopColor="red"/>*/}
          {/*</radialGradient>*/}
        </defs>

        <rect x="0" y="0" rx="15" ry="15" width="100" height="100"
          fill="url(#Gradient)" stroke="black" strokeWidth="2"/>

        <circle cx="40" cy="40" r="30" fill="transparent" stroke="white" strokeWidth="2"/>
        <circle cx="50" cy="50" r="50" fill="transparent" stroke="white" strokeWidth="2"/>
        <circle cx="35" cy="35" r="2" fill="white" stroke="white"/>
        <circle cx="60" cy="60" r="2" fill="white" stroke="white"/>
        <text x="38" y="40" fill="white" fontFamily="sans-serif" fontSize="10pt">(fx,fy)</text>
        <text x="60" y="60" fill="white" fontFamily="sans-serif" fontSize="10pt">(cx,cy)</text>

      </svg>
      <svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {/*<defs>*/}
        {/*  <radialGradient id="RadialGradient1">*/}
        {/*    <stop offset="0%" stopColor="red"/>*/}
        {/*    <stop offset="100%" stopColor="blue"/>*/}
        {/*  </radialGradient>*/}
        {/*  /!**/}
        {/*  cx cy 属性定义了中心点的相对坐标 值都属于0-1*/}
        {/*  r 属性定义了发散的相对径向半径,即会被发散影响到的范围 值属于0-1*/}
        {/*  stopColor是最开始的颜色*/}
        {/*  *!/*/}
        {/*  <radialGradient id="RadialGradient2" cx="0.5" cy="0.5" r="0.5">*/}
        {/*    <stop offset="0%" stopColor="white"/>*/}
        {/*    <stop offset="50%" stopColor="blue"/>*/}
        {/*    <stop offset="80%" stopColor="green"/>*/}
        {/*    <stop offset="100%" stopColor="orange"/>*/}
        {/*  </radialGradient>*/}
        {/*</defs>*/}
        {/*<rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)"/>*/}
        {/*<rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient2)"/>*/}

      </svg>
    </>
  )
}

function Gradient() {
  return (
    <>
      <svg width="500" height="500" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/*
          linearGradient 线性渐变 沿着某个方向到什么位置截止
           使用offset(偏移属性)和stop-color(颜色中值)属性说明渐变在特定位置上应该是什么颜色 offset属于0-1
          */}
          <linearGradient id="Gradient1">
            <stop className={style.stop1} offset="0.3"/>
            <stop className={style.stop2} offset="30%"/>
            <stop className={style.stop3} offset="60%"/>
            <stop className={style.stop4} offset="100%"/>
          </linearGradient>
          <linearGradient id="Gradient2" x1="0" y1="0"  x2="0"  y2="1">
            <stop offset="0%" stopColor="red"/>
            <stop offset="50%" stopColor="yellow" />
            <stop offset="100%" stopColor="blue"/>
          </linearGradient>
          <linearGradient id="Gradient3" x1="0" x2="0" y1="0" y2="1" href="#Gradient1" />
        </defs>
        <rect x="120" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient3)"/>
        <line x1={0} y1={0} x2={500} y2={500} strokeWidth={5} stroke={'url(#Gradient1)'}></line>
        <rect  x="200" y="10" rx="15" ry="15" width="100" height="100" fill="none" strokeWidth={5} stroke={'url(#Gradient1)'}/>
        <rect  x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#Gradient1)" />
        <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>

      </svg>

    </>
  )
}

function Strokes() {

  return (
    <>

      <>
        <svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="Gradient1">
              <stop className="stop1" offset="0%"/>
              <stop className="stop2" offset="50%"/>
              <stop className="stop3" offset="100%"/>
            </linearGradient>
            {/*
            linearGradient 中stopColor是最终的颜色
            */}
            <linearGradient id="Gradient2" x1="0" y1="0"  x2="0" y2="1">
              <stop offset="0%" stopColor="red"/>
              <stop offset="50%" stopColor="black" stopOpacity="0"/>
              <stop offset="100%" stopColor="blue"/>
            </linearGradient>

          </defs>

          <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>
          <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>

        </svg>

      </>
      <>
        <svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="RadialGradient1">
              <stop offset="0%" stopColor="red"/>
              <stop offset="100%" stopColor="blue"/>
            </radialGradient>
            <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
              <stop offset="0%" stopColor="red"/>
              <stop offset="100%" stopColor="blue"/>
            </radialGradient>
          </defs>

          <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)"/>
          <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient2)"/>

        </svg>

      </>
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">

        <rect x="10" height="180" y="10" width="180" id="MyRect"/>
        {/*
          strokeLinecap控制边框终点的形状
        */}
        {/*<rect x={10} y={10} height={100} width={100}*/}
        {/*  stroke={'blue'} strokeWidth={15} fill={'red'} strokeLinecap={'round'} fillOpacity={0.9} strokeOpacity={0.8}></rect>*/}
        {/*<line x1="40" x2="120" y1="150" y2="150" stroke="black" strokeWidth="20"  />*/}
        {/*<line x1="40" x2="120" y1="20" y2="20" stroke="black" strokeWidth="20" strokeLinecap="butt"/>*/}
        {/*<line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>*/}
        {/*<line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>*/}
        {/*
        stroke-linecap 直线断点处的样式
        stroke-linejoin 折线转角处的转角样式
        */}
        {/*<polyline points="40 60 120 60 80 20 " stroke="black" stroke-width="20"*/}
        {/*  strokeLinecap="butt" fill="none" strokeLinejoin="miter"/>*/}

        {/*<polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20"*/}
        {/*  strokeLinecap="round" fill="none" strokeLinejoin="round"/>*/}

        {/*<polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20"*/}
        {/*  strokeLinecap="square" fill="none" strokeLinejoin="bevel"/>*/}

        {/*<path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black"*/}
        {/*  strokeLinecap="round" strokeWidth={10} stroke-dasharray="15,15,50"  fill="none"/>*/}
        {/*<path d="M 10 75 L 190 75" stroke="red"*/}
        {/*  stroke-linecap="round" stroke-width="1" stroke-dasharray="5,10, 5" fill="none"/>*/}
      </svg>
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
         //
         */}
        {/*
          起始点 0 50 ；终点 50 0；
          半径都是50
           1表示取大角
           0表示起点到终点逆时针（一个是形成大弧的逆时针，一个是形成小弧的逆时针）

        */}
        <path d="M 0 50
           A 50 50, 0, 1, 0, 50 0
           " fill="green"/>
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
