import React from 'react'

const centerX = 0
const centerY = 0
const pageWidth = 1000
const pageHeight = 1000
const radius = 10
const strokeWidth = 2

const leftWidth = 200
const rightWidth = pageWidth - leftWidth

export function SvgCalendar() {
  // viewBox 的含义
  // min-x 重新定义零点x
  // min-y 重新定义零点y
  // width 定义宽度单位
  // height 定义高度单位
  return (
    <div style={{
      height: '100%',
      width: '100%',
      overflow: 'auto',
    }}>
      <svg viewBox={`${centerX} ${centerY} ${pageWidth} ${pageHeight}`}
        xmlns="http://www.w3.org/2000/svg" >
        {/*绘制中心点坐标*/}
        <circle cx={centerX} cy={centerY} r={radius} fill={'red'}></circle>
        {/*绘制左上角坐标*/}
        <circle cx={centerX} cy={centerY} r={radius} fill={'black'}></circle>
        {/*绘制右上角*/}
        <circle cx={pageWidth} cy={centerY} r={radius} fill={'black'}></circle>
        {/*绘制左下角坐标*/}
        <circle cx={0} cy={pageHeight} r={radius} fill={'black'}></circle>
        {/*绘制右下角坐标*/}
        <circle cx={pageWidth} cy={pageHeight} r={radius} fill={'black'}></circle>
        {/*绘制整个矩形框*/}
        <g>
          <rect x={centerX} y={centerY} width={pageWidth} height={pageHeight} fill={'none'} strokeWidth={strokeWidth} stroke={'blue'} ></rect>
        </g>
        <SvgCalendarLeft />
        <SvgCalendarRight />
      </svg>
    </div>
  )
}
function SvgCalendarLeft() {
  // 绘制左边区域
  return (
    <g>
      <rect x={centerX} y={centerY} width={leftWidth} height={pageHeight} fill={'none'} strokeWidth={strokeWidth} stroke={'red'}></rect>
    </g>
  )
}
function SvgCalendarRight() {
  // 绘制右边区域

  const startX = leftWidth * 0.2
  const startY = pageHeight * 0.02
  const endY = startY
  const endX = leftWidth - startX
  // 二阶贝塞尔的控制点
  const ctrX = leftWidth / 2
  const ctrY = startY + 10
  function UCalendar() {
    return (
      <g>
        <defs>
          <path id="MyPath"
            d={`
            M ${startX} ${startY}
             Q ${ctrX} ${ctrY} ${endX} ${endY}
            `} />
        </defs>
        <use href="#MyPath" fill="none" stroke="red"  />
        <text fontSize="24">
          <textPath href="#MyPath">
            UCalendar
          </textPath>
        </text>
      </g>
    )
  }
  const buttonX = startX
  const buttonY = startY + 20
  const buttonHeight = 30
  const buttonWidth = endX - startX
  const buttonFontSize = 12
  const buttonTextY = buttonY + (buttonHeight / 2) + 3 // +3是因为字体自身高度的影响
  const buttonTextX = buttonX + (buttonWidth / 2) - (buttonFontSize * 2)

  function AddButton() {
    return (
      <g>
        <defs>
          <filter id="buttonFilter" filterUnits="userSpaceOnUse">
            <feGaussianBlur in="SourceAlpha" result="blur" stdDeviation="5" />
            <feOffset in="blur" dx="5"  dy="4" result="offsetBlur"/>
            <feSpecularLighting in="blur" surfaceScale="1" specularConstant=".45"
              specularExponent="60" lightingColor="#b7c2cb"
              result="specOut">
              <fePointLight x="100" y="100" z="200"/>
            </feSpecularLighting>

            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
            <feComposite in="SourceGraphic" in2="specOut2" operator="over"
              k1="10" k2="10" k3="1" k4="0.50" result="litPaint"/>
            <feMerge>
              <feMergeNode in="offsetBlur"/>
              <feMergeNode in="litPaint"/>
            </feMerge>
          </filter>
        </defs>
        <rect
          filter={'url(#buttonFilter)'}
          x={buttonX} y={buttonY}
          rx={strokeWidth * 2}
          ry={strokeWidth * 2}
          width={buttonWidth} height={buttonHeight}
          fill={'#transparent'} stroke={'blue'} strokeWidth={strokeWidth} />
        <text fill={'white'} x={buttonTextX} y={buttonTextY} fontSize={buttonFontSize} fontWeight={600}>
          添加日历
        </text>
      </g>
    )
  }

  const datePadding = 10
  const dateX = datePadding
  const dateY = buttonY + buttonHeight + 20
  const dateWidth = leftWidth - (datePadding * 2)
  const dateHeight = 30
  const dateTextX = dateX
  const dateTextY = dateY + (dateHeight / 2) + 6 // +6是为了适应字体本身的高度
  const dateCRadius = dateHeight / 4
  const dateCRightX = dateX + dateWidth - dateCRadius
  const dateCRightY = dateTextY - 6// 去掉字体对中心点的影响
  const dateCLeftX = dateCRightX - (2 * dateCRadius) - 5 // 减5是为了隔开两个圆
  const dateCLeftY = dateCRightY
  const dateStroke = 'black'

  function SampleDate() {
    return (
      <g>
        <rect x={dateX} y={dateY} width={dateWidth} height={dateHeight} fill={'none'} stroke={'blue'} strokeWidth={strokeWidth}/>
        <text x={dateTextX} y={dateTextY} fill={'black'} fontSize={16}>
          2023年05月
        </text>
        <circle cx={dateCLeftX} cy={dateCLeftY} r={dateCRadius} fill={'none'} strokeWidth={strokeWidth} stroke={dateStroke} />
        <polyline id={'leftTriangle'}  points={
          `${dateCLeftX + (dateCRadius / 3)} ${dateCLeftY - (dateCRadius / 2)}
          ${dateCLeftX + (dateCRadius / 3)} ${dateCLeftY + (dateCRadius / 2)}
          ${dateCLeftX - (dateCRadius / 1.2)} ${dateCLeftY}
          ${dateCLeftX + (dateCRadius / 3)} ${dateCLeftY - (dateCRadius / 2)}
          `} stroke={'black'} strokeWidth={1} fill={'black'} strokeLinejoin="bevel"/>
        <circle cx={dateCRightX} cy={dateCRightY} r={dateCRadius} fill={'none'} strokeWidth={strokeWidth} stroke={dateStroke} />
        <use href={'#leftTriangle'}
          transform={`matrix(1 0 0 1 ${(dateCRadius * 2) + 5} 0) rotate(180,${dateCLeftX},${dateCLeftY})`} />
      </g>
    )
  }


  return (
    <g>
      <rect x={leftWidth} y={centerY} width={rightWidth}  height={pageHeight} fill={'none'} strokeWidth={strokeWidth} stroke={'blue'} />
      <UCalendar />
      <AddButton />
      <SampleDate />
    </g>
  )
}
