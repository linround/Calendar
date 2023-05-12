
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
  function UCalendar() {
    const startX = 40
    const startY = 20
    const endY = startY
    const endX = leftWidth - startX
    const ctrX = leftWidth / 2
    const ctrY = startY + 10
    return (
      <>
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

      </>
    )
  }
  return (
    <g>
      <rect x={leftWidth} y={centerY} width={rightWidth} height={pageHeight} fill={'none'} strokeWidth={strokeWidth} stroke={'blue'} />
      <UCalendar />
    </g>
  )
}
