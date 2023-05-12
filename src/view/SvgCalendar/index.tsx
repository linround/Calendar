export function SvgCalendar() {
  // viewBox 的含义
  // min-x 重新定义零点x
  // min-y 重新定义零点y
  // width 定义宽度单位
  // height 定义高度单位
  const radius = 10
  return (
    <svg viewBox={'-500 -500 1000 1000'}
      xmlns="http://www.w3.org/2000/svg" >
      <rect x={0} y={0} width={100} height={100} fill={'blue'}></rect>
      <circle cx={0} cy={0} r={radius} fill={'red'}></circle>
      <circle cx={500} cy={0} r={radius} fill={'black'}></circle>
      <circle cx={-500} cy={0} r={radius} fill={'black'}></circle>
      <circle cx={0} cy={500} r={radius} fill={'black'}></circle>
      <circle cx={0} cy={-500} r={radius} fill={'black'}></circle>
      <g>
        <rect x={0} y={0} ></rect>
      </g>
    </svg>
  )
}
